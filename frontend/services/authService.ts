import { apiClient } from './api';

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
  message: string;
}

export async function loginOrCreateUser(request: LoginRequest): Promise<LoginResult> {
  const response = await apiClient.post<LoginResult>('/users/login', request);

  const result = (response.data as any)?.data || response.data;

  if (!result?.token || !result?.user) {
    throw new Error(response.error || 'Login failed.');
  }

  apiClient.setAuthToken(result.token);
  localStorage.setItem('user', JSON.stringify(result.user));

  return result;
}

export async function registerUser(request: LoginRequest): Promise<LoginResult> {
  if (!request.fullName) throw new Error('Full name is required');

  const response = await apiClient.post<LoginResult>('/users', request);

  const result = (response.data as any)?.data || response.data;

  if (!result?.token || !result?.user) {
    throw new Error(response.error || 'Registration failed.');
  }

  apiClient.setAuthToken(result.token);
  localStorage.setItem('user', JSON.stringify(result.user));

  return result;
}