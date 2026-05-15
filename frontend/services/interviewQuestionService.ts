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

interface StoredInterviewAnswer {
  id: number;
  option_text: string;
  is_correct: boolean;
}

interface StoredInterviewQuestion {
  id: number;
  question_text: string;
  question_type: string;
  question_order: number;
  answers?: StoredInterviewAnswer[];
}

function mapQuestion(
  question: ApiInterviewQuestion,
  index: number
): InterviewQuestion {
  return {
    ...question,
    id: question.id || index + 1,
    completed: question.completed ?? false,
    current: question.current ?? index === 0,
    isCorrect: question.isCorrect ?? false
  };
}

function mapStoredQuestion(
  question: StoredInterviewQuestion,
  index: number
): InterviewQuestion {
  return {
    id: question.id,
    title: `Question ${index + 1}`,
    questionText: question.question_text,
    questionType: question.question_type,
    questionOrder: question.question_order ?? index + 1,
    difficulty: 'medium',
    tags: ['Interview', question.question_type || 'General'],
    hint: '',
    explanation: '',
    completed: false,
    current: index === 0,
    isCorrect: false,
    selectedOptionId: null,
    options: (question.answers || []).map((answer) => ({
      id: String(answer.id),
      text: answer.option_text,
      isCorrect: answer.is_correct
    }))
  };
}

export async function getInterviewQuestionsByInterviewId(
  interviewId: number
): Promise<InterviewQuestion[]> {
  const response = await apiClient.get<StoredInterviewQuestion[]>(`/questions/interview/${interviewId}`);
  const questions = response.data || [];

  return questions.map((question, index) => mapStoredQuestion(question, index));
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
      questions: response.data.questions.map((question, index) =>
        mapQuestion(question, index)
      )
    }
  };
}
