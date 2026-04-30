const OpenAI = require('openai');
const { AI_CONFIG } = require('../config/ai.js');

// Initialize NVIDIA NIM client (OpenAI-compatible)
const createNVIDIA_CLIENT = () => {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY environment variable is required');
  }

  return new OpenAI({
    baseURL: AI_CONFIG.baseURL,
    apiKey: process.env.NVIDIA_API_KEY,
    timeout: AI_CONFIG.timeout
  });
};

/**
 * Generate AI-powered interview analysis
 * @param {Object} interview - Interview object with questions, answers, and user info
 * @param {Object} cv - User's CV data
 * @returns {Promise<Object>} Analysis result matching AnalysisResult interface
 */
async function generateAnalysis(interview, cv) {
  const client = createNVIDIA_CLIENT();

  // Prepare interview data for AI
  const interviewData = {
    role: cv?.title || 'Technical Position',
    questions: interview.questions?.map(q => ({
      question: q.question_text,
      type: q.question_type,
      category: getQuestionCategory(q.question_type)
    })) || [],
    answers: interview.answers || []
  };

  const prompt = buildAnalysisPrompt(interviewData);

  try {
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: `You are an expert technical interviewer and career coach. Your task is to analyze interview responses and provide structured feedback in valid JSON format.

You MUST return ONLY valid JSON with no markdown, no code blocks, and no additional text. The JSON must match this exact structure:`
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

    if (!aiResponse) {
      throw new Error('No response from AI model');
    }

    // Parse AI response
    const analysis = JSON.parse(aiResponse);

    // Validate and normalize the response
    return normalizeAnalysis(analysis, interview);

  } catch (error) {
    console.error('AI Analysis Error:', error.message);

    if (error.status === 401) {
      throw new Error('Invalid NVIDIA API key configured');
    } else if (error.status === 429) {
      throw new Error('NVIDIA API rate limit exceeded. Please try again later.');
    } else if (error.status === 503) {
      throw new Error('NVIDIA service temporarily unavailable');
    }

    throw error;
  }
}

/**
 * Build the prompt for AI analysis
 */
function buildAnalysisPrompt(interviewData) {
  return `
INTERVIEW CONTEXT:
Position: ${interviewData.role}
Total Questions: ${interviewData.questions.length}

QUESTIONS & ANSWERS:
${interviewData.questions.map((q, idx) => `
Question ${idx + 1} [${q.category}]:
"${q.question}"
Type: ${q.type}
`).join('\n')}

INSTRUCTIONS:
Analyze the interview performance and provide feedback in this EXACT JSON structure:

{
  "overall_score": number (0-100),
  "readiness_label": "ready" | "needs_practice" | "not_ready",
  "strongest_category": "Technical" | "Behavioral" | "Communication" | "Planning",
  "weakest_category": "Technical" | "Behavioral" | "Communication" | "Planning",
  "category_scores": [
    {"category": "Technical", "score": number (0-100), "correct": number, "total": number},
    {"category": "Behavioral", "score": number (0-100), "correct": number, "total": number},
    {"category": "Communication", "score": number (0-100), "correct": number, "total": number},
    {"category": "Planning", "score": number (0-100), "correct": number, "total": number}
  ],
  "strengths": ["string", "string", "string"],
  "weaknesses": ["string", "string", "string"],
  "recommended_actions": ["string", "string", "string"],
  "answer_reviews": [
    {
      "questionId": number,
      "prompt": "string",
      "category": "string",
      "selectedOption": "string",
      "correctOption": "string",
      "isCorrect": boolean,
      "explanation": "string",
      "takeaway": "string"
    }
  ]
}

SCORING GUIDELINES:
- Overall score: Weighted average of all categories
- Technical: Problem-solving, coding knowledge, technical depth
- Behavioral: Soft skills, teamwork, adaptability
- Communication: Clarity, articulation, confidence
- Planning: Strategy, approach, methodology
- readiness_label: score >= 80 = "ready", 60-79 = "needs_practice", < 60 = "not_ready"

IMPORTANT: Return ONLY the JSON object. No markdown, no explanations, no extra text.
`;
}

/**
 * Determine category from question type
 */
function getQuestionCategory(type) {
  const categoryMap = {
    'technical': 'Technical',
    'coding': 'Technical',
    'algorithm': 'Technical',
    'behavioral': 'Behavioral',
    'situational': 'Behavioral',
    'communication': 'Communication',
    'planning': 'Planning',
    'system_design': 'Technical'
  };
  return categoryMap[type?.toLowerCase()] || 'Technical';
}

/**
 * Normalize and validate AI response
 */
function normalizeAnalysis(analysis, interview) {
  // Ensure required fields exist
  const normalized = {
    overallScore: Math.min(100, Math.max(0, analysis.overall_score || 50)),
    readinessLabel: ['ready', 'needs_practice', 'not_ready'].includes(analysis.readiness_label)
      ? analysis.readiness_label
      : 'needs_practice',
    strongestCategory: analysis.strongest_category || 'Technical',
    weakestCategory: analysis.weakest_category || 'Behavioral',
    categoryScores: analysis.category_scores || generateDefaultCategoryScores(),
    strengths: analysis.strengths || ['Good effort'],
    weaknesses: analysis.weaknesses || ['More practice needed'],
    recommendedActions: analysis.recommended_actions || ['Review key concepts'],
    answerReviews: analysis.answer_reviews || []
  };

  // Ensure category scores have all 4 categories
  const requiredCategories = ['Technical', 'Behavioral', 'Communication', 'Planning'];
  requiredCategories.forEach(cat => {
    if (!normalized.categoryScores.find(cs => cs.category === cat)) {
      normalized.categoryScores.push({
        category: cat,
        score: 50,
        correct: 0,
        total: 0
      });
    }
  });

  return normalized;
}

/**
 * Generate default category scores
 */
function generateDefaultCategoryScores() {
  return [
    { category: 'Technical', score: 50, correct: 0, total: 0 },
    { category: 'Behavioral', score: 50, correct: 0, total: 0 },
    { category: 'Communication', score: 50, correct: 0, total: 0 },
    { category: 'Planning', score: 50, correct: 0, total: 0 }
  ];
}

module.exports = { generateAnalysis };
