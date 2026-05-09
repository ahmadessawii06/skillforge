import { API_CONFIG } from '../config/api';

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
      const storedToken = localStorage.getItem('auth_token') || localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
        localStorage.setItem('auth_token', storedToken);
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  /**
   * معالجة الردود بشكل موحد واستخراج الأخطاء والـ Flags الخاصة بالـ AI
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.error || data.message || 'failed to get data from ai',
        requiresGeneration: data.requiresGeneration,
        existingAnalysis: data.existingAnalysis
      };
    }

    if (data && typeof data === 'object' && 'success' in data) {
      return data as ApiResponse<T>;
    }

    return {
      success: true,
      data: data as T
    };
  }

  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
        signal: AbortSignal.timeout(API_CONFIG.timeout)
      });

      return await this.handleResponse<T>(response);
    } catch (error: unknown) {
      if (isTimeoutError(error)) {
        throw { status: 408, message: 'failed to get data from ai due to time out' };
      }
      throw error;
    }
  }

  public async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(API_CONFIG.timeout)
      });

      return await this.handleResponse<T>(response);
    } catch (error: unknown) {
      if (isTimeoutError(error)) {
        throw { status: 408, message: 'failed to send data to ai due to time out' };
      }
      throw error;
    }
  }

  public async postForm<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    try {
      // Do NOT set Content-Type — browser sets it with the correct boundary for multipart
      const headers: HeadersInit = {};
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
        signal: AbortSignal.timeout(API_CONFIG.timeout)
      });

      return await this.handleResponse<T>(response);
    } catch (error: unknown) {
      if (isTimeoutError(error)) {
        throw { status: 408, message: 'failed to send data to ai due to time out' };
      }
      throw error;
    }
  }
}

// تصدير نسخة واحدة (Singleton)
export const apiClient = new ApiClient();

export const isAuthenticated = (): boolean => {
  return !!(localStorage.getItem('auth_token') || localStorage.getItem('token'));
};

function isTimeoutError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'TimeoutError';
}
