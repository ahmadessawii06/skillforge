import { API_CONFIG } from '../config/api';

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  requiresGeneration?: boolean;
  existingAnalysis?: boolean;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.loadToken();
  }

  private loadToken(): void {
    try {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        this.token = storedToken;
      }
    } catch (error) {
      console.error('Failed to load auth token:', error);
    }
  }

  public setAuthToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  public clearAuthToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.error || 'Unknown error occurred',
        requiresGeneration: data.requiresGeneration,
        existingAnalysis: data.existingAnalysis
      };
    }

    return data;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
      signal: AbortSignal.timeout(API_CONFIG.timeout)
    });

    return this.handleResponse<T>(response);
  }

  public async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(API_CONFIG.timeout)
    });

    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

// Helper function to clear all auth data
export const logout = (): void => {
  apiClient.clearAuthToken();
};
