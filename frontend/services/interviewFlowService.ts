import { apiClient } from './api';

export interface CreateCVRequest {
  userId: number;
  fileName?: string;
  uploadAt?: string;
  experience_level: string;
  target_job_title: string;
}

export interface CVRecord {
  id: number;
  userId: number;
  fileName?: string;
  experience_level: string;
  target_job_title: string;
}

export interface InterviewRecord {
  id: number;
  userId: number;
  cvId: number;
  status: string;
}

export async function createCV(request: CreateCVRequest): Promise<CVRecord> {
  const response = await apiClient.post<{ cv: CVRecord }>('/cvs', request);
  const cv = response.data?.cv;

  if (!cv) {
    throw new Error(response.error || 'Failed to save CV profile.');
  }

  return cv;
}

export async function createInterview(userId: number, cvId: number): Promise<InterviewRecord> {
  const response = await apiClient.post<{ interview: InterviewRecord }>('/interviews', {
    userId,
    cvId,
    status: 'in_progress'
  });
  const interview = response.data?.interview;

  if (!interview) {
    throw new Error(response.error || 'Failed to create interview.');
  }

  return interview;
}

export interface ParsedCVData {
  name?: string;
  title?: string;
  email?: string | null;
  phone?: string | null;
  skills?: string[];
  experience?: { company: string; role: string; period: string; highlights: string[] }[];
  education?: { degree: string; institution: string; year: string }[];
}



export async function extractCVData(file: File) {
    const formData = new FormData();

    formData.append("cv", file);
    const response = await fetch("http://localhost:3000/api/cvs/extract", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();

        console.error("CV extraction API error:", errorText);

        throw new Error("Failed to extract CV data.");
    }

    return response.json();
}