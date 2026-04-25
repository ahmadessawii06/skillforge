/* ===== Analysis Types ===== */

export interface CategoryScore {
  category: string;
  score: number;
  correct: number;
  total: number;
}

export interface AnswerReview {
  questionId: string;
  prompt: string;
  category: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
  explanation: string;
  takeaway: string;
}

export interface AnalysisResult {
  overallScore: number;
  readinessLabel: string;
  strongestCategory: string;
  weakestCategory: string;
  categoryScores: CategoryScore[];
  recommendedActions: string[];
  answerReviews: AnswerReview[];
}

export interface InterviewConfig {
  role: string;
  level?: string;
}

export interface InterviewSession {
  config: InterviewConfig;
}
