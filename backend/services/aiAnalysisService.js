const OpenAI = require('openai');
const { AI_CONFIG } = require('../config/ai.js');

// ─── تهيئة العميل ─────────────────────────────────────────────────────────
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

// ─── دوال مساعدة ───────────────────────────────────────────────────────────
function clampScore(score) {
  const numericScore = Number(score);
  if (!Number.isFinite(numericScore)) return 0;
  return Math.max(0, Math.min(100, Math.round(numericScore)));
}

function getQuestionCategory(type = '') {
  const t = String(type).toLowerCase();
  if (t.includes('behavior')) return 'Behavioral';
  if (t.includes('communication')) return 'Communication';
  if (t.includes('planning') || t.includes('system') || t.includes('design')) return 'Planning';
  return 'Technical';
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

// ─── التحقق من صحة بيانات المقابلة (5 أسئلة مُجابة) ─────────────────────
function validateInterview(interview, cv) {
  if (!interview || typeof interview !== 'object') {
    throw new Error('Invalid interview data: interview object is required.');
  }

  const questions = interview.questions;
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Interview must contain at least  question with an answer.');
  }

  console.log(`[aiAnalysisService]: Validating interview for role: ${interview.role || 'N/A'}. Questions to validate: ${questions.length}`);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    
    // relax check: if question text is missing, try to find it
    if (!q.id && !q.questionText && !q.question_text) {
      console.warn(`[aiAnalysisService]: Question at index ${i} is missing an identifier or text. Data:`, JSON.stringify(q).slice(0, 100));
      // we can't really proceed without at least text or id
      throw new Error(`Question at index ${i} is missing an identifier or text.`);
    }

    const options = q.options || [];
    if (!Array.isArray(options) || options.length === 0) {
      console.error(`[aiAnalysisService]: Question ${i + 1} has no options.`, q.id);
      throw new Error(`Question ${i + 1} must have options to analyze.`);
    }

    const validIds = options.map(opt => String(opt.id));
    const selectedId = q.selectedOptionId ? String(q.selectedOptionId) : null;

    if (!selectedId) {
      console.warn(`[aiAnalysisService]: Question ${i + 1} (ID: ${q.id}) has no selected answer.`);
      throw new Error(`Question ${i + 1} is missing a selected answer. Please answer all questions.`);
    }

    if (!validIds.includes(selectedId)) {
      console.warn(`[aiAnalysisService]: Question ${i + 1} (ID: ${q.id}) selected option ${selectedId} not found in options:`, validIds);
      // We'll allow it if userAnswerText is present as a fallback, but still warn
      if (!q.userAnswer && !q.userAnswerText) {
         throw new Error(`Question ${i + 1} has an invalid selected answer ID (${selectedId}).`);
      }
    }
  }

  // التحقق من وجود ما يكفي لتحديد الدور
  const role = interview.role || (cv && (cv.target_job_title || cv.title));
  if (!role || role.trim().length === 0) {
    throw new Error('Cannot generate analysis: role information is missing. Provide it in interview.role or cv.');
  }
}

// ─── بناء البرومبت مع إحصائيات حقيقية ─────────────────────────────────────
function buildPrompt(interviewData) {
  const { role, questions } = interviewData;

  // تجميع إحصائيات حسب الفئة
  const stats = {
    Technical: { correct: 0, total: 0 },
    Behavioral: { correct: 0, total: 0 },
    Communication: { correct: 0, total: 0 },
    Planning: { correct: 0, total: 0 }
  };

  questions.forEach(q => {
    const cat = getQuestionCategory(q.questionType);
    stats[cat].total++;
    if (q.isUserCorrect) stats[cat].correct++;
  });

  const categorySummary = Object.entries(stats).map(([cat, data]) =>
    `${cat}: ${data.correct}/${data.total} correct`
  ).join('\n');

  // قائمة الأسئلة مع إجابات المستخدم
  const questionsText = questions.map((q, idx) => {
    const userAnswerText = q.options.find(o => o.id === q.selectedOptionId)?.text || 'N/A';
    return `Q${idx + 1} (${q.questionType}): ${q.questionText}
Selected: "${userAnswerText}" (${q.isUserCorrect ? 'Correct' : 'Incorrect'})`;
  }).join('\n\n');

  return `### ANALYSIS REQUEST
**Position:** ${role}
**Number of questions:** ${questions.length}

### PERFORMANCE SUMMARY (actual)
${categorySummary}

### FULL RESPONSES
${questionsText}

### EVALUATION TASK
Based on the above actual performance, provide a professional, constructive analysis. 
Return ONLY a JSON object with this exact structure (no additional text):

{
  "overall_score": number (0-100),
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
      "category": "Technical",
      "isCorrect": boolean,
      "explanation": "Why this answer is correct/incorrect and what it demonstrates",
      "takeaway": "Specific advice to improve on this topic"
    }
  ]
}

IMPORTANT:
- Use the actual correct/incorrect status provided for each question.
- overall_score should reflect overall performance across categories.
- category_scores: fill "correct" and "total" with the actual numbers given above; "score" is your assessment for that category (0-100).
- answer_reviews: one object per question, using the question IDs provided.
- Strengths, weaknesses, recommendations should be actionable and based on the responses.`;
}

// ─── تجهيز البيانات قبل إرسالها للـ AI ───────────────────────────────────
function prepareInterviewData(interview, cv) {
  const role = interview.role || (cv && (cv.target_job_title || cv.title)) || 'Candidate';
  const questions = interview.questions.map((q, index) => {
    const correctOption = q.options.find(o => o.isCorrect === true);
    const selectedOption = q.selectedOptionId;
    const isUserCorrect = correctOption && correctOption.id === selectedOption;

    return {
      id: q.id || index + 1,
      questionText: q.questionText || q.question_text || '',
      questionType: q.questionType || q.question_type || 'technical',
      category: getQuestionCategory(q.questionType || q.question_type),
      options: q.options,
      selectedOptionId: selectedOption,
      isUserCorrect: Boolean(isUserCorrect),
      userAnswerText: q.options.find(o => o.id === selectedOption)?.text || ''
    };
  });

  return { role, questions };
}

// ─── تطبيع مخرجات النموذج ودمجها مع البيانات الحقيقية ───────────────────
function normalizeAnalysis(parsed, interviewData) {
  const { role, questions } = interviewData;

  // إصلاح category_scores باستخدام الأرقام الحقيقية
  const realStats = {
    Technical: { correct: 0, total: 0 },
    Behavioral: { correct: 0, total: 0 },
    Communication: { correct: 0, total: 0 },
    Planning: { correct: 0, total: 0 }
  };
  questions.forEach(q => {
    const cat = getQuestionCategory(q.questionType);
    realStats[cat].total++;
    if (q.isUserCorrect) realStats[cat].correct++;
  });

  const categoryScores = (Array.isArray(parsed.category_scores) ? parsed.category_scores : [])
    .map(item => ({
      category: item.category || 'Technical',
      score: clampScore(item.score),
      correct: realStats[item.category]?.correct ?? 0,
      total: realStats[item.category]?.total ?? 0
    }));

  // answer_reviews
  const answerReviews = (Array.isArray(parsed.answer_reviews) ? parsed.answer_reviews : [])
    .map((review, idx) => {
      const q = questions[idx] || {};
      return {
        questionId: String(q.id || review.questionId || idx + 1),
        prompt: q.questionText || '',
        category: review.category || getQuestionCategory(q.questionType),
        selectedOption: q.userAnswerText || 'No response',
        correctOption: q.options?.find(o => o.isCorrect)?.text || '',
        isCorrect: Boolean(q.isUserCorrect),
        explanation: review.explanation || 'No explanation provided.',
        takeaway: review.takeaway || 'Keep practicing this area.'
      };
    });

  return {
    overallScore: clampScore(parsed.overall_score),
    readinessLabel: parsed.readiness_label || 'needs_practice',
    strongestCategory: parsed.strongest_category || 'Technical',
    weakestCategory: parsed.weakest_category || 'Technical',
    categoryScores,
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
    recommendedActions: Array.isArray(parsed.recommended_actions) ? parsed.recommended_actions : [],
    answerReviews
  };
}

// ─── الدالة الرئيسية (Generate Analysis) ─────────────────────────────────
async function generateAnalysis(interview, cv = {}) {
  // 1. التحقق من صحة البيانات
  validateInterview(interview, cv);

  // 2. تجهيز البيانات
  const interviewData = prepareInterviewData(interview, cv);

  // 3. إنشاء العميل وبناء البرومبت
  const client = createNVIDIA_CLIENT();
  const prompt = buildPrompt(interviewData);

  try {
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are a Senior Technical Recruiter and Performance Analyst.
           Evaluate interview answers objectively, provide clear explanations and actionable advice.`
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

    // 4. تحويل الـ JSON وتطبيع النتيجة
    const parsed = parseJsonResponse(aiResponse);
    return normalizeAnalysis(parsed, interviewData);

  } catch (error) {
    console.error('[AI Analysis Service Error]:', error.message);
    if (error.status === 401) throw new Error('Invalid API Configuration');
    if (error.status === 429) throw new Error('Rate limit exceeded');
    if (error.status === 404) throw new Error('Model not found or unavailable');
    throw error;
  }
}

module.exports = { generateAnalysis };