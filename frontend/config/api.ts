// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',

  // Request timeout in milliseconds
  timeout: 30000,

  // Retry configuration
  retries: 1,

  // API versions
  version: 'v1'
};

// Environment validation
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('⚠️  VITE_API_BASE_URL not set. Using default:', API_CONFIG.baseURL);
}
