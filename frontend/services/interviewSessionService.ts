import type { AnalysisResult } from "../src/components/analysis/types";
import type {
  GenerateInterviewQuestionsRequest,
  InterviewQuestion,
} from "./interviewQuestionService";

export type StoredInterviewSession = {
  interviewId: number | null;
  generationRequest: GenerateInterviewQuestionsRequest;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
};

export type StoredAnalysisSession = {
  interviewId: number | null;
  analysis: AnalysisResult;
};

const ACTIVE_INTERVIEW_ID_STORAGE_KEY = "skillforge.active.interviewId";
const INTERVIEW_SESSION_STORAGE_KEY = "skillforge.interview.session";
const ANALYSIS_SESSION_STORAGE_KEY = "skillforge.analysis.session";

function getInterviewSessionStorageKey(interviewId: number | null): string {
  return interviewId
    ? `${INTERVIEW_SESSION_STORAGE_KEY}.${interviewId}`
    : `${INTERVIEW_SESSION_STORAGE_KEY}.unsaved`;
}

function getAnalysisSessionStorageKey(interviewId: number | null): string {
  return interviewId
    ? `${ANALYSIS_SESSION_STORAGE_KEY}.${interviewId}`
    : `${ANALYSIS_SESSION_STORAGE_KEY}.latest`;
}

export function getActiveInterviewId(): number | null {
  try {
    const rawValue = window.localStorage.getItem(ACTIVE_INTERVIEW_ID_STORAGE_KEY);
    const parsed = Number(rawValue);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function setActiveInterviewId(interviewId: number | null): void {
  try {
    if (interviewId) {
      window.localStorage.setItem(
        ACTIVE_INTERVIEW_ID_STORAGE_KEY,
        String(interviewId),
      );
      return;
    }

    window.localStorage.removeItem(ACTIVE_INTERVIEW_ID_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to update active interview session", error);
  }
}

export function loadInterviewSession(
  interviewId: number | null,
): StoredInterviewSession | null {
  try {
    const rawSession = window.localStorage.getItem(
      getInterviewSessionStorageKey(interviewId),
    );

    if (!rawSession) {
      return null;
    }

    const parsed = JSON.parse(rawSession) as Partial<StoredInterviewSession>;

    if (!Array.isArray(parsed.questions)) {
      return null;
    }

    return {
      interviewId:
        typeof parsed.interviewId === "number" ? parsed.interviewId : interviewId,
      generationRequest: isPlainObject(parsed.generationRequest)
        ? parsed.generationRequest
        : {},
      questions: normalizeStoredQuestions(parsed.questions),
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === "number"
          ? parsed.currentQuestionIndex
          : 0,
    };
  } catch {
    return null;
  }
}

export function saveInterviewSession(session: StoredInterviewSession): void {
  try {
    window.localStorage.setItem(
      getInterviewSessionStorageKey(session.interviewId),
      JSON.stringify(session),
    );
  } catch (error) {
    console.warn("Failed to save interview session", error);
  }
}

export function clearInterviewSession(interviewId: number | null): void {
  try {
    window.localStorage.removeItem(getInterviewSessionStorageKey(interviewId));
  } catch (error) {
    console.warn("Failed to clear interview session", error);
  }
}

export function loadAnalysisSession(
  interviewId: number | null,
): StoredAnalysisSession | null {
  try {
    const rawSession = window.localStorage.getItem(
      getAnalysisSessionStorageKey(interviewId),
    );

    if (!rawSession) {
      return null;
    }

    const parsed = JSON.parse(rawSession) as Partial<StoredAnalysisSession>;

    if (!isAnalysisResult(parsed.analysis)) {
      return null;
    }

    return {
      interviewId:
        typeof parsed.interviewId === "number" ? parsed.interviewId : interviewId,
      analysis: parsed.analysis,
    };
  } catch {
    return null;
  }
}

export function saveAnalysisSession(session: StoredAnalysisSession): void {
  try {
    window.localStorage.setItem(
      getAnalysisSessionStorageKey(session.interviewId),
      JSON.stringify(session),
    );
  } catch (error) {
    console.warn("Failed to save analysis session", error);
  }
}

export function clearAnalysisSession(interviewId: number | null): void {
  try {
    window.localStorage.removeItem(getAnalysisSessionStorageKey(interviewId));
  } catch (error) {
    console.warn("Failed to clear analysis session", error);
  }
}

export function clearActiveInterviewSession(
  interviewId: number | null = getActiveInterviewId(),
): void {
  clearInterviewSession(interviewId);
  clearInterviewSession(null);
  clearAnalysisSession(interviewId);
  clearAnalysisSession(null);

  if (!interviewId || getActiveInterviewId() === interviewId) {
    setActiveInterviewId(null);
  }
}

export function getInterviewPath(): string {
  const interviewId = getActiveInterviewId();
  return interviewId ? `/interview?interviewId=${interviewId}` : "/interview";
}

export function getAnalysisPath(): string {
  const interviewId = getActiveInterviewId();
  return interviewId ? `/analysis?interviewId=${interviewId}` : "/analysis";
}

function normalizeStoredQuestions(questions: unknown): InterviewQuestion[] {
  if (!Array.isArray(questions)) {
    return [];
  }

  return questions.filter(isStoredInterviewQuestion);
}

function isStoredInterviewQuestion(value: unknown): value is InterviewQuestion {
  if (!value || typeof value !== "object") {
    return false;
  }

  const question = value as {
    id?: unknown;
    questionText?: unknown;
    options?: unknown;
  };

  return (
    typeof question.id === "number" &&
    typeof question.questionText === "string" &&
    Array.isArray(question.options)
  );
}

function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const analysis = value as AnalysisResult;

  return (
    typeof analysis.overallScore === "number" &&
    typeof analysis.readinessLabel === "string" &&
    Array.isArray(analysis.categoryScores) &&
    Array.isArray(analysis.recommendedActions) &&
    Array.isArray(analysis.answerReviews)
  );
}

function isPlainObject(value: unknown): value is GenerateInterviewQuestionsRequest {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
