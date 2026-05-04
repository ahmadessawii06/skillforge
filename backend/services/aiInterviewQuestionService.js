const OpenAI = require("openai");
const { AI_CONFIG } = require("../config/ai.js");

const OPTION_IDS = ["a", "b", "c", "d"];
const ALLOWED_DIFFICULTIES = new Set(["easy", "medium", "hard", "mixed"]);
const ALLOWED_TYPES = new Set([
  "technical",
  "behavioral",
  "problem_solving",
  "system_design",
  "communication",
]);

// ─── Fisher-Yates shuffle (pure, no mutation of original) ───────────────────
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Validate request has minimum required data for question generation
function validateRequest(request) {
  const missing = [];

  // At minimum, we need either skills or a CV summary
  const hasSkills = Array.isArray(request.skills) && request.skills.length > 0;
  const hasCV = request.cvSummary && request.cvSummary.trim().length > 0;

  if (!hasSkills && !hasCV) {
    missing.push("either skills or a CV summary");
  }

  if (missing.length > 0) {
    throw new Error(
      `Cannot generate interview: missing ${missing.join(" and ")}.`,
    );
  }

  // Log validation pass
  console.log('[AI Service Validation] ✓ Request is valid', { 
    hasSkills, 
    hasCV,
    skillCount: request.skills.length,
    role: request.role
  });
}

function createNVIDIAClient() {
  if (!AI_CONFIG.apiKey) {
    throw new Error(
      "NVIDIA_API_KEY or NVIDIA_NIM_API_KEY is missing in environment variables",
    );
  }

  return new OpenAI({
    baseURL: AI_CONFIG.baseURL,
    apiKey: AI_CONFIG.apiKey,
    timeout: AI_CONFIG.timeout,
  });
}

async function generateInterviewQuestions(input = {}) {
  const request = normalizeRequest(input);
  
  console.log('[AI Service] Validating request...', { 
    role: request.role,
    experienceLevel: request.experienceLevel,
    count: request.count,
    hasSkills: request.skills.length > 0,
    hasCVSummary: request.cvSummary.length > 0
  });
  
  validateRequest(request);
  const client = createNVIDIAClient();

  try {
    validateRequest(request);
    console.log('[AI Service] Making API call to NVIDIA model:', AI_CONFIG.model);
    
    const completion = await client.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(),
        },
        {
          role: "user",
          content: buildUserPrompt(request),
        },
      ],
      temperature: 0.2,
      max_tokens: AI_CONFIG.maxTokens,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error("AI Engine failed to generate interview questions");
    }

    console.log('[AI Service] AI response received, parsing...');
    const parsed = parseJsonResponse(aiResponse);
    const normalized = normalizeGeneratedQuestions(
      parsed,
      request.count,
    );
    
    console.log('[AI Service] Generated and normalized', normalized.questions.length, 'questions');
    return normalized;
  } catch (error) {
    console.error("[AI Interview Question Service Error Details]:", {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code,
      url: error.request ? error.request.url : "unknown",
    });
    if (error.status === 401)
      throw new Error("Invalid NVIDIA API configuration");
    if (error.status === 404)
      throw new Error(`Model not found or unavailable: ${AI_CONFIG.model}`);
    if (error.status === 410)
      throw new Error(
        `Model was deprecated/removed by NVIDIA: ${AI_CONFIG.model}`,
      );
    if (error.status === 429) throw new Error("NVIDIA API rate limit exceeded");
    throw error;
  }
}

function normalizeRequest(input) {
  const count = Math.max(1, Math.min(15, Number(input.count) || 5));
  const difficulty = ALLOWED_DIFFICULTIES.has(
    String(input.difficulty).toLowerCase(),
  )
    ? String(input.difficulty).toLowerCase()
    : "mixed";

  const questionTypes =
    Array.isArray(input.questionTypes) && input.questionTypes.length > 0
      ? input.questionTypes
          .map((type) => String(type).toLowerCase())
          .filter((type) => ALLOWED_TYPES.has(type))
      : ["technical", "behavioral", "problem_solving"];

  return {
    role: String(input.role || input.targetRole || "Frontend Developer")
      .trim()
      .slice(0, 80),
    experienceLevel: String(input.experienceLevel || "junior")
      .trim()
      .slice(0, 40),
    difficulty,
    count,
    skills: normalizeStringList(input.skills, 12),
    questionTypes,
    cvSummary: input.cvSummary
      ? String(input.cvSummary).trim().slice(0, 1200)
      : "",
  };
}

function normalizeStringList(value, limit) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item).trim())
    .filter(Boolean)
    .slice(0, limit);
}

function buildSystemPrompt() {
  return `You are SkillForge's principal interview architect.
Design fair, job-relevant, high-signal multiple-choice interview questions for software candidates.

Quality bar:
- Test practical judgment, fundamentals, and real-world tradeoffs.
- Avoid trivia, trick wording, duplicate questions, and ambiguous correct answers.
- Keep each question under 220 characters and each option under 120 characters.
- Provide exactly one correct option per question. Mark it with "isCorrect": true.
- The correct option MUST always be option "a" in your output — the server will shuffle positions automatically.
- Match the requested role, skills, experience level, and difficulty.
- Return strict JSON only, with no markdown or commentary.`;
}

function buildUserPrompt(request) {
  const skills = request.skills.length
    ? request.skills.join(", ")
    : request.cvSummary
      ? `the skills evident from the candidate's CV for the role of ${request.role}`
      : `the core skills expected for a ${request.role} role`;
  const types = request.questionTypes.join(", ");
  const cvContext = request.cvSummary
    ? `\nCandidate CV summary:\n${request.cvSummary}`
    : "";

  return `Generate ${request.count} interview questions.

Role: ${request.role}
Experience level: ${request.experienceLevel}
Difficulty: ${request.difficulty}
Skills to target: ${skills}
Question types: ${types}${cvContext}

Return this JSON shape:
{
  "questions": [
    {
      "title": "short topic label",
      "questionText": "question text",
      "questionType": "technical | behavioral | problem_solving | system_design | communication",
      "difficulty": "easy | medium | hard",
      "tags": ["2 to 4 short tags"],
      "hint": "one useful hint",
      "explanation": "why the correct option is right",
      "options": [
        { "id": "a", "text": "CORRECT answer text here", "isCorrect": true },
        { "id": "b", "text": "wrong option text",        "isCorrect": false },
        { "id": "c", "text": "wrong option text",        "isCorrect": false },
        { "id": "d", "text": "wrong option text",        "isCorrect": false }
      ]
    }
  ]
}

IMPORTANT INSTRUCTIONS:
1. Replace ALL placeholder text with real, specific interview content based on the role and CV.
2. Always place the correct answer as option "a" — the server handles randomization.
3. Make wrong options plausible but clearly incorrect to a knowledgeable candidate.
4. Exactly one option must have "isCorrect": true.`;
}

function parseJsonResponse(content) {
  const cleaned = String(content)
    .replace(/```json|```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (_) {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error("AI response was not valid JSON");
    }

    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  }
}

function normalizeGeneratedQuestions(parsed, expectedCount) {
  const questions = Array.isArray(parsed.questions) ? parsed.questions : [];

  const normalized = questions
    .slice(0, expectedCount)
    .map((question, index) => normalizeQuestion(question, index))
    .filter(Boolean);

  if (!normalized.length) {
    throw new Error("AI response did not include usable questions");
  }

  return {
    questions: normalized,
  };
}

function normalizeQuestion(question, index) {
  const options = normalizeOptions(question.options);
  if (!options) return null;

  const questionText = String(
    question.questionText || question.question_text || "",
  )
    .trim()
    .slice(0, 220);
  if (!questionText) return null;

  const questionType = ALLOWED_TYPES.has(
    String(question.questionType).toLowerCase(),
  )
    ? String(question.questionType).toLowerCase()
    : "technical";

  return {
    id: index + 1,
    title: String(question.title || toTitle(questionType))
      .trim()
      .slice(0, 60),
    questionText,
    questionType,
    questionOrder: index + 1,
    difficulty: normalizeDifficulty(question.difficulty),
    tags: normalizeStringList(question.tags, 4),
    hint: String(question.hint || "")
      .trim()
      .slice(0, 220),
    explanation: String(question.explanation || "")
      .trim()
      .slice(0, 400),
    options,
  };
}

// ─── Core fix: validate first, then shuffle positions server-side ────────────
function normalizeOptions(options) {
  if (!Array.isArray(options) || options.length < 4) return null;

  // 1. Parse the raw options (don't trust AI-assigned ids)
  const parsed = options.slice(0, 4).map((option) => {
    const rawCorrect = option.isCorrect ?? option.is_correct;
    return {
      text: String(option.text || option.option_text || "")
        .trim()
        .slice(0, 120),
      isCorrect: rawCorrect === true || rawCorrect === "true",
    };
  });

  // 2. Reject if any option has empty text
  if (parsed.some((option) => !option.text)) return null;

  // 3. Reject if not exactly one correct answer
  const correctCount = parsed.filter((option) => option.isCorrect).length;
  if (correctCount !== 1) return null;

  // 4. Shuffle the options randomly (Fisher-Yates) — correct answer lands anywhere
  const shuffled = shuffleArray(parsed);

  // 5. Reassign stable ids a/b/c/d after shuffle
  return shuffled.map((option, index) => ({
    id: OPTION_IDS[index],
    text: option.text,
    isCorrect: option.isCorrect,
  }));
}
// ────────────────────────────────────────────────────────────────────────────

function normalizeDifficulty(difficulty) {
  const value = String(difficulty || "").toLowerCase();
  return ["easy", "medium", "hard"].includes(value) ? value : "medium";
}

function toTitle(value) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

module.exports = {
  generateInterviewQuestions,
};
