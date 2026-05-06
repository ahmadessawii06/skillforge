const { Evaluation, Interview, CV, Question, Answer } = require("../models");
const { generateAnalysis } = require("../services/aiAnalysisService");

exports.getAnalysis = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const evaluation = await Evaluation.findOne({ where: { interviewId } });

    if (!evaluation?.ai_feedback) {
      return res.status(404).json({
        success: false,
        error: "Analysis not found",
        requiresGeneration: true
      });
    }

    res.status(200).json({
      success: true,
      data: parseStoredAnalysis(evaluation.ai_feedback)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.generateInterviewAnalysis = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findByPk(interviewId, {
      include: [
        { model: CV, as: "cv" },
        {
          model: Question,
          as: "questions",
          include: [{ model: Answer, as: "answers" }]
        }
      ],
      order: [[{ model: Question, as: "questions" }, "question_order", "ASC"]]
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        error: "Interview not found"
      });
    }

    const plainInterview = interview.get({ plain: true });
    const analysisInput = mergeSubmittedAnswers(interview, req.body?.questions || []);

    console.log(`[AnalysisController]: Generating analysis for interview ${interviewId}.`);
    // console.log(`[AnalysisController]: req.body.questions received:`, JSON.stringify(req.body?.questions, null, 2));
    // console.log(`[AnalysisController]: interview.questions from DB:`, JSON.stringify(plainInterview.questions, null, 2));
    console.log(`[AnalysisController]: Merged questions count: ${analysisInput.questions?.length || 0}`);

    const analysis = await generateAnalysis(analysisInput, interview.cv);

    await saveAnalysis(interviewId, analysis);
    await interview.update({
      status: "completed",
      total_score: String(analysis.overallScore)
    });

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    const status = error.message.includes("API") || error.message.includes("Rate limit") ? 502 : 500;

    console.error('[AnalysisController Error]:', {
      message: error.message,
      stack: error.stack,
      interviewId: req.params.interviewId,
      body: req.body
    });

    res.status(status).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.checkAnalysisStatus = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const evaluation = await Evaluation.findOne({ where: { interviewId } });

    res.status(200).json({
      success: true,
      data: {
        hasAnalysis: Boolean(evaluation?.ai_feedback)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

function mergeSubmittedAnswers(interview, submittedQuestions) {
  console.log(`[mergeSubmittedAnswers]: Merging for interview ${interview.id}`);
  const submittedById = new Map(
    (submittedQuestions || []).map(question => [String(question.id), question]));

  const plainInterview = interview.get({ plain: true });
  const dbQuestions = plainInterview.questions || [];

  console.log(`[mergeSubmittedAnswers]: DB questions: ${dbQuestions.length}, Submitted: ${submittedQuestions?.length || 0}`);

  let mergedQuestions = dbQuestions.map((question, index) => {
    // Try matching by ID first, then by index as a fallback
    const submitted = submittedById.get(String(question.id)) || submittedQuestions[index];

    if (!submitted) {
      console.warn(`[mergeSubmittedAnswers]: No match for DB question ID ${question.id} at index ${index}`);
    }

    // Map DB answers to options if submitted options are missing
    const options = (submitted?.options || (question.answers || []).map(a => ({
      id: String(a.id),
      text: a.option_text,
      isCorrect: a.is_correct
    })));

    const merged = {
      ...question,
      questionText: question.question_text || submitted?.questionText || submitted?.question_text,
      questionType: question.question_type || submitted?.questionType || submitted?.question_type,
      selectedOptionId: submitted?.selectedOptionId,
      userAnswer: submitted?.userAnswer,
      options: options || []
    };
    
    return merged;
  });

  // CRITICAL FIX: If DB had no questions but frontend sent some, use frontend questions!
  if (mergedQuestions.length === 0 && (submittedQuestions || []).length > 0) {
    console.log(`[mergeSubmittedAnswers]: DB questions empty, falling back to ${submittedQuestions.length} submitted questions.`);
    mergedQuestions = (submittedQuestions || []).map(q => ({
      ...q,
      questionText: q.questionText || q.question_text,
      questionType: q.questionType || q.question_type || 'technical'
    }));
  }

  return {
    ...plainInterview,
    questions: mergedQuestions
  };
}

async function saveAnalysis(interviewId, analysis) {
  const payload = {
    interviewId,
    strength: (analysis.strengths || []).join("\n").slice(0, 500),
    weaknesess: (analysis.weaknesses || []).join("\n").slice(0, 500),
    ai_feedback: JSON.stringify(analysis),
    technical_skills: JSON.stringify(analysis.categoryScores?.find(score => score.category === "Technical") || {}),
    behavior_skills: JSON.stringify(analysis.categoryScores?.find(score => score.category === "Behavioral") || {}),
    communication: JSON.stringify(analysis.categoryScores?.find(score => score.category === "Communication") || {})
  };

  const existing = await Evaluation.findOne({ where: { interviewId } });
  if (existing) {
    await existing.update(payload);
    return existing;
  }

  return Evaluation.create(payload);
}

function parseStoredAnalysis(value) {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (_) {
    return {
      overallScore: 0,
      readinessLabel: "needs_practice",
      strongestCategory: "Technical",
      weakestCategory: "Technical",
      categoryScores: [],
      recommendedActions: [],
      answerReviews: []
    };
  }
}
