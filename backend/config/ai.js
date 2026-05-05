// AI Configuration for NVIDIA API
const AI_CONFIG = {
  // NVIDIA NIM API endpoint (OpenAI-compatible)
  baseURL: process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1',

  // Accept both names because the current .env uses NVIDIA_NIM_API_KEY.
  apiKey: process.env.NVIDIA_API_KEY || process.env.NVIDIA_NIM_API_KEY,

  // Model to use — set NVIDIA_MODEL in .env to override.
  model: process.env.NVIDIA_MODEL || 'nvidia/nvidia-nemotron-nano-9b-v2',

  // Request timeout in ms (increased to 120s for slow AI responses)
  timeout: 30000,

  // Maximum tokens for response
  maxTokens: 50000,

  // Temperature for creativity (lower = more deterministic)
  temperature: 0.3
};

// Validation
if (!AI_CONFIG.apiKey) {
  console.warn('NVIDIA_API_KEY or NVIDIA_NIM_API_KEY not set - AI features will be disabled');
}

module.exports = { AI_CONFIG };
