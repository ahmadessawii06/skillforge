// AI Configuration for NVIDIA API
const AI_CONFIG = {
  // NVIDIA NIM API endpoint (OpenAI-compatible)
  baseURL: process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1',

  // Model to use
  model: process.env.NVIDIA_MODEL || 'z-ai/glm-4.9',

  // Request timeout in ms
  timeout: 60000,

  // Maximum tokens for response
  maxTokens: 4000,

  // Temperature for creativity (lower = more deterministic)
  temperature: 0.3,

  // Ensure JSON response
  responseFormat: 'json_object'
};

// Validation
if (!process.env.NVIDIA_API_KEY) {
  console.warn('⚠️  NVIDIA_API_KEY not set - AI features will be disabled');
}

module.exports = { AI_CONFIG };
