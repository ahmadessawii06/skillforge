import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import {
  generateInterviewQuestions,
  type GenerateInterviewQuestionsRequest,
  type InterviewQuestion
} from '../services/interviewQuestionService';

export interface UseInterviewQuestionsReturn {
  questions: InterviewQuestion[];
  loading: boolean;
  error: string | null;
  generate: (override?: GenerateInterviewQuestionsRequest) => Promise<void>;
  setQuestions: Dispatch<SetStateAction<InterviewQuestion[]>>;
  resetProgress: () => void;
}


export function useInterviewQuestions(
  initialQuestions: InterviewQuestion[] = [],
  initialRequest: GenerateInterviewQuestionsRequest = {},
  autoGenerate = true
): UseInterviewQuestionsReturn {
  const initialRequestRef = useRef(initialRequest);
  const [questions, setQuestions] = useState<InterviewQuestion[]>(initialQuestions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetProgress = useCallback(() => {
    setQuestions(currentQuestions =>
      currentQuestions.map((question, index) => ({
        ...question,
        completed: false,
        current: index === 0,
        isCorrect: false
      }))
    );
  }, []);

  const generate = useCallback(async (override: GenerateInterviewQuestionsRequest = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await generateInterviewQuestions({
        ...initialRequestRef.current,
        ...override
      });

      if (response.data?.questions?.length) {
        setQuestions(response.data.questions);
      } else {
        const errorMsg = response.error || 'No interview questions were generated.';
        console.error('[useInterviewQuestions] No questions in response:', { response, errorMsg });
        setError(errorMsg);
      }
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'Failed to generate interview questions.');
      console.error('[useInterviewQuestions] Catch error:', { err, errorMsg });
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      if (!autoGenerate) return; 

    if (autoGenerate) {
      void generate();
    }
  }, [autoGenerate, generate]);
  

  return {
    questions,
    loading,
    error,
    generate,
    setQuestions,
    resetProgress
  };
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object') {
    const maybeError = error as { message?: unknown; error?: unknown };
    if (typeof maybeError.message === 'string') return maybeError.message;
    if (typeof maybeError.error === 'string') return maybeError.error;
  }

  return fallback;
}
