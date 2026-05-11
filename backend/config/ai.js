// AI Configuration for groq
const AI_CONFIG = {
  // GROK NIM API endpoint (OpenAI-compatible)
  baseURL: process.env.GROK_API_URL,

  // groq API key
  apiKey:  process.env.GROK_API_KEY,

  // Model to use — set GROK_MODEL in .env to override.
  model: process.env.GROK_MODEL,

  // Request timeout in ms (increased to 120s for slow AI responses)
  timeout: 30000,

  // Maximum tokens for response
  maxTokens: 5000,

  // Temperature for creativity (lower = more deterministic)
  temperature: 0.3
};

// Validation
if (!AI_CONFIG.apiKey) {
  console.warn('GROK_API_KEY not set - AI features will be disabled');
}

module.exports = { AI_CONFIG };
