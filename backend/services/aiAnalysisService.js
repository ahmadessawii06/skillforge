const OpenAI = require('openai');
const { AI_CONFIG } = require('../config/ai.js');

const createNVIDIA_CLIENT = () => {
  if (!AI_CONFIG.apiKey) {
    throw new Error('NVIDIA_API_KEY or NVIDIA_NIM_API_KEY is missing in environment variables');
  }
  return new OpenAI({
    baseURL: AI_CONFIG.baseURL,
    apiKey: AI_CONFIG.apiKey,
    timeout: AI_CONFIG.timeout
  });
};

/**
 * @param {Object} interview - الكائن الذي يحتوي على الأسئلة والإجابات
 * @param {Object} cv - بيانات المستخدم
 */
async function generateAnalysis(interview, cv) {
  const client = createNVIDIA_CLIENT();

  // تحسين عملية تحضير البيانات لضمان شمولية الإجابات
  const sourceQuestions = interview.questions || [];
  const interviewData = {
    role: cv?.target_job_title || cv?.title || interview.role || 'Technical Candidate',
    questions: sourceQuestions.map(q => {
      const selectedAnswer = q.answers?.find(a => String(a.id) === String(q.selectedOptionId))?.option_text
                             || q.options?.find(a => String(a.id) === String(q.selectedOptionId))?.text
                             || q.userAnswer
                             || "No response provided";

      return {
        id: q.id,
        question: q.question_text,
        type: q.question_type,
        category: getQuestionCategory(q.question_type),
        userAnswer: selectedAnswer,
        selectedOption: selectedAnswer,
        correctOption: q.answers?.find(a => a.is_correct)?.option_text
          || q.options?.find(a => a.isCorrect)?.text
          || ''
      };
    }) || []
  };

  const prompt = buildAnalysisPrompt(interviewData);

  try {
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are a Senior Technical Recruiter and Performance Analyst. 
          Your mission is to evaluate candidate interview responses with high objectivity, 
          providing constructive feedback and precise scoring across multiple dimensions.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
      response_format: { type: 'json_object' }
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) throw new Error('AI Engine failed to generate a response');

    return normalizeAnalysis(parseJsonResponse(aiResponse), {
      ...interview,
      questions: interviewData.questions
    });

  } catch (error) {
    console.error('[AI Service Error]:', error.message);
    // الاحتفاظ بنفس هيكلية الأخطاء الأصلية لعدم كسر الربط مع الفرونت اند
    if (error.status === 401) throw new Error('Invalid API Configuration');
    if (error.status === 429) throw new Error('Rate limit exceeded');
    throw error;
  }
}

function parseJsonResponse(content) {
  const cleaned = String(content).replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (_) {
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error('AI response was not valid JSON');
    }

    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  }
}

/**
 * برومت احترافي مطور (Advanced Prompt Engineering)
 */
function buildAnalysisPrompt(interviewData) {
  return `
### EXECUTIVE CONTEXT
- **Target Position:** ${interviewData.role}
- **Total Evaluated Items:** ${interviewData.questions.length}

### CANDIDATE RESPONSES
${interviewData.questions.map((q, idx) => `
ID: ${idx + 1} | Category: ${q.category}
Question: "${q.question}"
Candidate Answer: "${q.userAnswer}"
---`).join('\n')}

### EVALUATION PROTOCOL
1. **Scoring Logic:** Assign 0-100 based on technical accuracy, clarity, and depth.
2. **Readiness Mapping:** - 80+ : "ready" (Exceeds expectations)
   - 60-79: "needs_practice" (Solid foundation, minor gaps)
   - <60: "not_ready" (Significant gaps)
3. **Structured Review:** For each answer, provide an 'explanation' (why this score) and a 'takeaway' (how to improve).

### REQUIRED OUTPUT (STRICT JSON ONLY)
{
  "overall_score": number,
  "readiness_label": "ready" | "needs_practice" | "not_ready",
  "strongest_category": "Technical" | "Behavioral" | "Communication" | "Planning",
  "weakest_category": "Technical" | "Behavioral" | "Communication" | "Planning",
  "category_scores": [
    {"category": "Technical", "score": number, "correct": number, "total": number},
    {"category": "Behavioral", "score": number, "correct": number, "total": number},
    {"category": "Communication", "score": number, "correct": number, "total": number},
    {"category": "Planning", "score": number, "correct": number, "total": number}
  ],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "recommended_actions": ["string"],
  "answer_reviews": [
    {
      "questionId": number,
      "category": "string",
      "isCorrect": boolean,
      "explanation": "Professional critique",
      "takeaway": "Actionable advice"
    }
  ]
}`;
}

function getQuestionCategory(type = '') {
  const normalized = String(type).toLowerCase();

  if (normalized.includes('behavior')) return 'Behavioral';
  if (normalized.includes('communication')) return 'Communication';
  if (normalized.includes('planning') || normalized.includes('system')) return 'Planning';
  return 'Technical';
}

function normalizeAnalysis(parsed, interview) {
  const categoryScores = Array.isArray(parsed.category_scores) ? parsed.category_scores : [];
  const answerReviews = Array.isArray(parsed.answer_reviews) ? parsed.answer_reviews : [];
  const questions = interview.questions || [];

  return {
    overallScore: clampScore(parsed.overall_score),
    readinessLabel: parsed.readiness_label || 'needs_practice',
    strongestCategory: parsed.strongest_category || 'Technical',
    weakestCategory: parsed.weakest_category || 'Technical',
    categoryScores: categoryScores.map(score => ({
      category: score.category || 'Technical',
      score: clampScore(score.score),
      correct: Number.isFinite(Number(score.correct)) ? Number(score.correct) : 0,
      total: Number.isFinite(Number(score.total)) ? Number(score.total) : 0
    })),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    recommendedActions: Array.isArray(parsed.recommended_actions) ? parsed.recommended_actions : [],
    answerReviews: answerReviews.map((review, index) => ({
      questionId: String(questions[index]?.id || review.questionId || index + 1),
      prompt: questions[index]?.question || questions[index]?.question_text || '',
      category: review.category || questions[index]?.category || getQuestionCategory(questions[index]?.question_type),
      selectedOption: questions[index]?.selectedOption || questions[index]?.userAnswer || 'No response provided',
      correctOption: questions[index]?.correctOption || '',
      isCorrect: Boolean(review.isCorrect),
      explanation: review.explanation || 'No explanation provided.',
      takeaway: review.takeaway || 'Review the concept and practice a stronger answer.'
    }))
  };
}

function clampScore(score) {
  const numericScore = Number(score);
  if (!Number.isFinite(numericScore)) return 0;
  return Math.max(0, Math.min(100, Math.round(numericScore)));
}

module.exports = { generateAnalysis };
