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

  if (!response.data?.token || !response.data.user) {
    throw new Error(response.error || 'Login failed.');
  }

  apiClient.setAuthToken(response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));

  return response.data;
}
