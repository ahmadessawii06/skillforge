// AI Configuration for OpenRouter
const AI_CONFIG = {
  // OpenRouter API endpoint (OpenAI-compatible)
  baseURL: process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1',

  // OpenRouter API key
  apiKey: process.env.OPENROUTER_API_KEY || process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY,

  // Model to use — set OPENROUTER_MODEL in .env to override.
  model: process.env.OPENROUTER_MODEL || 'gpt-4o-mini',

  // Request timeout in ms (increased to 240s for slow AI responses)
  timeout: 240000,

  // Maximum tokens for response
  // Narrowed down to reduce latency and avoid overly large AI replies.
  maxTokens: 1500,

  // Temperature for creativity (lower = more deterministic)
  temperature: 0.3
};

// Validation
if (!AI_CONFIG.apiKey) {
  console.warn('OPENROUTER_API_KEY not set - AI features will be disabled');
}

module.exports = { AI_CONFIG };
