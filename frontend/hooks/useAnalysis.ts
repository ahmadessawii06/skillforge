import { useState, useEffect, useCallback } from 'react';
import {
  getAnalysis,
  generateAnalysis as generateAnalysisAPI,
  regenerateAnalysis as regenerateAnalysisAPI
} from '../services/analysisService';
import type { AnalysisResult } from '../src/components/analysis/types';

export interface UseAnalysisReturn {
  data: AnalysisResult | null;
  loading: boolean;
  error: string | null;
  needsGeneration: boolean;
  generating: boolean;
  refresh: () => Promise<void>;
  generate: () => Promise<void>;
  regenerate: () => Promise<void>;
}

/**
 * Custom hook لإدارة دورة حياة تحليل المقابلات بالذكاء الاصطناعي
 */
export function useAnalysis(interviewId: number | null): UseAnalysisReturn {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsGeneration, setNeedsGeneration] = useState(false);
  const [generating, setGenerating] = useState(false);

  // دالة جلب البيانات الحالية
  const refresh = useCallback(async () => {
    if (!interviewId) return;

    setLoading(true);
    setError(null);
    setNeedsGeneration(false);

    try {
      const response = await getAnalysis(interviewId);
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (err: unknown) {
      const apiError = toApiError(err);
      // إذا أخبرنا الباك اند أن التحليل غير موجود ويجب توليده
      if (apiError.requiresGeneration) {
        setNeedsGeneration(true);
        setData(null);
      } else {
        setError(apiError.message || 'فشل تحميل بيانات التحليل');
      }
    } finally {
      setLoading(false);
    }
  }, [interviewId]);

  // دالة طلب توليد تحليل جديد من الـ AI
  const generate = useCallback(async () => {
    if (!interviewId) return;

    setGenerating(true);
    setError(null);

    try {
      const response = await generateAnalysisAPI(interviewId);
      if (response.success && response.data) {
        setData(response.data);
        setNeedsGeneration(false);
      }
    } catch (err: unknown) {
      setError(toApiError(err).message || 'حدث خطأ أثناء محاولة إنشاء التحليل');
    } finally {
      setGenerating(false);
    }
  }, [interviewId]);

  // دالة إعادة توليد التحليل
  const regenerate = useCallback(async () => {
    if (!interviewId) return;

    setGenerating(true);
    setError(null);

    try {
      const response = await regenerateAnalysisAPI(interviewId);
      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (err: unknown) {
      setError(toApiError(err).message || 'فشل إعادة توليد التحليل');
    } finally {
      setGenerating(false);
    }
  }, [interviewId]);

  // استدعاء البيانات عند أول تشغيل أو عند تغيير الـ ID
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    data,
    loading,
    error,
    needsGeneration,
    generating,
    refresh,
    generate,
    regenerate
  };
}

function toApiError(error: unknown): { message?: string; requiresGeneration?: boolean } {
  if (error && typeof error === 'object') {
    const apiError = error as { message?: unknown; requiresGeneration?: unknown };

    return {
      message: typeof apiError.message === 'string' ? apiError.message : undefined,
      requiresGeneration: Boolean(apiError.requiresGeneration)
    };
  }

  return {};
}
