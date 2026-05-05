import { apiClient, type ApiResponse } from './api';

export interface InterviewQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface InterviewQuestion {
  id: number;
  title: string;
  questionText: string;
  questionType: string;
  questionOrder: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  hint: string;
  explanation: string;
  completed: boolean;
  current: boolean;
  isCorrect: boolean;
  selectedOptionId?: string | null;
  options: InterviewQuestionOption[];
}

export interface GenerateInterviewQuestionsRequest {
  interviewId?: number;
  saveToInterview?: boolean;
  role?: string;
  targetRole?: string;
  experienceLevel?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  count?: number;
  skills?: string[];
  questionTypes?: string[];
  cvSummary?: string;
}

export interface GenerateInterviewQuestionsResult {
  questions: InterviewQuestion[];
  saved: boolean;
  interviewId: number | null;
}

interface ApiInterviewQuestion extends Omit<InterviewQuestion, 'completed' | 'current' | 'isCorrect'> {
  completed?: boolean;
  current?: boolean;
  isCorrect?: boolean;
}

export async function generateInterviewQuestions(
  request: GenerateInterviewQuestionsRequest = {}
): Promise<ApiResponse<GenerateInterviewQuestionsResult>> {
  const response = await apiClient.post<{
    questions: ApiInterviewQuestion[];
    saved: boolean;
    interviewId: number | null;
  }>('/questions/ai/generate', request);

  if (!response.data) {
    return response as ApiResponse<GenerateInterviewQuestionsResult>;
  }

  return {
    ...response,
    data: {
      ...response.data,
      questions: response.data.questions.map((question, index) => ({
        ...question,
        id: question.id || index + 1,
        completed: false,
        current: index === 0,
        isCorrect: false
      }))
    }
  };
}
