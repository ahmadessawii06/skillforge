import { apiClient, type ApiResponse } from './api';
import type { AnalysisResult } from '../src/components/analysis/types';

/**
 * Analysis Service
 * Handles all API calls related to interview analysis
 */

export interface Interview {
  id: number;
  userId: number;
  cvId: number;
  status: string;
  total_score: string | null;
  total_duration: string | null;
  cv?: {
    id: number;
    title: string;
  };
  evaluation?: {
    id: number;
    interviewId: number;
    strength: string;
    weaknesess: string;
    ai_feedback: string;
  };
  questions?: Array<{
    id: number;
    question_text: string;
    question_type: string;
    answers?: Array<{
      id: number;
      option_text: string;
      is_correct: boolean;
    }>;
  }>;
}

export interface AnalysisStatus {
  hasAnalysis: boolean;
  data?: Interview;
}

/**
 * Get analysis for a specific interview
 */
export async function getAnalysis(interviewId: number): Promise<ApiResponse<AnalysisResult>> {
  return apiClient.get<AnalysisResult>(`/analysis/${interviewId}`);
}

/**
 * Generate AI analysis for an interview
 */
export interface SubmittedAnalysisQuestion {
  id: number;
  selectedOptionId?: string | null;
  userAnswer?: string;
  options?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

export interface GenerateAnalysisRequest {
  questions?: SubmittedAnalysisQuestion[];
}

export async function generateAnalysis(
  interviewId: number,
  request?: GenerateAnalysisRequest
): Promise<ApiResponse<AnalysisResult>> {
  return apiClient.post<AnalysisResult>(`/analysis/${interviewId}/generate`, request);
}

/**
 * Regenerate analysis for an interview
 */
export async function regenerateAnalysis(
  interviewId: number,
  request?: GenerateAnalysisRequest
): Promise<ApiResponse<AnalysisResult>> {
  return apiClient.post<AnalysisResult>(`/analysis/${interviewId}/regenerate`, request);
}

/**
 * Check if interview has analysis
 */
export async function checkAnalysisStatus(interviewId: number): Promise<ApiResponse<AnalysisStatus>> {
  return apiClient.get<AnalysisStatus>(`/interviews/${interviewId}/analysis/status`);
}

/**
 * Get all user interviews
 */
export async function getUserInterviews(): Promise<ApiResponse<Interview[]>> {
  return apiClient.get<Interview[]>('/interviews/user');
}

/**
 * Get single interview details
 */
export async function getInterview(interviewId: number): Promise<ApiResponse<Interview>> {
  return apiClient.get<Interview>(`/interviews/${interviewId}`);
}
