import { useState, useEffect, useCallback } from 'react';
import {
  getAnalysis,
  generateAnalysis as generateAnalysisAPI,
  regenerateAnalysis as regenerateAnalysisAPI
} from '../services/analysisService';
import type { AnalysisResult } from '../components/anlysis/types';

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
 * Custom hook for managing interview analysis
 * @param interviewId - The interview ID to fetch analysis for
 */
export function useAnalysis(interviewId: number | null): UseAnalysisReturn {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsGeneration, setNeedsGeneration] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Fetch analysis
  const refresh = useCallback(async () => {
    if (!interviewId) return;

    setLoading(true);
    setError(null);
    setNeedsGeneration(false);

    try {
      const response = await getAnalysis(interviewId);

      if (response.success && response.data) {
        setData(response.data);
        setNeedsGeneration(false);
      }
    } catch (err: any) {
      if (err.requiresGeneration) {
        setNeedsGeneration(true);
        setData(null);
      } else {
        setError(err.message || 'Failed to load analysis');
      }
    } finally {
      setLoading(false);
    }
  }, [interviewId]);

  // Generate analysis
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
    } catch (err: any) {
      setError(err.message || 'Failed to generate analysis');
    } finally {
      setGenerating(false);
    }
  }, [interviewId]);

  // Regenerate analysis
  const regenerate = useCallback(async () => {
    if (!interviewId) return;

    setGenerating(true);
    setError(null);

    try {
      const response = await regenerateAnalysisAPI(interviewId);

      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to regenerate analysis');
    } finally {
      setGenerating(false);
    }
  }, [interviewId]);

  // Initial fetch
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
