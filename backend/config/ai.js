// AI Configuration for OpenRouter
const AI_CONFIG = {
  // NVIDIA NIM API endpoint (OpenAI-compatible)
  baseURL: process.env.NVIDIA_API_URL || 'https://openrouter.ai/api/v1',

  // OpenRouter API key
  apiKey:  process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY,

  // Model to use — set NVIDIA_MODEL in .env to override.
  model: process.env.NVIDIA_MODEL || 'openai/gpt-oss-120b',

  // Request timeout in ms (increased to 120s for slow AI responses)
  timeout: 30000,

  // Maximum tokens for response
  maxTokens: 50000,

  // Temperature for creativity (lower = more deterministic)
  temperature: 0.3
};

// Validation
if (!AI_CONFIG.apiKey) {
  console.warn('OPENROUTER_API_KEY not set - AI features will be disabled');
}

module.exports = { AI_CONFIG };
