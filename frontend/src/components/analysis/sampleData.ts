import type { AnalysisResult, InterviewSession } from './types.ts';

/**
 * Sample analysis data for demonstration.
 * Answer reviews use sample data as permitted.
 * In production, replace this with actual API data.
 */
export const sampleAnalysis: AnalysisResult = {
  overallScore: 0,
  readinessLabel: 'Not Evaluated',
  strongestCategory: 'N/A',
  weakestCategory: 'N/A',
  categoryScores: [
    { category: 'technical', score: 0, correct: 0, total: 0 },
    { category: 'behavioral', score: 0, correct: 0, total: 0 },
    { category: 'communication', score: 0, correct: 0, total: 0 },
    { category: 'planning', score: 0, correct: 0, total: 0 },
  ],
  recommendedActions: [],
  answerReviews: [
    {
      questionId: 'q1',
      prompt: 'What is the primary advantage of using a microservices architecture over a monolithic one?',
      category: 'technical',
      selectedOption: 'Independent deployment and scaling of services',
      correctOption: 'Independent deployment and scaling of services',
      isCorrect: true,
      explanation:
        'Microservices allow teams to deploy and scale individual services independently, reducing coupling and improving resilience.',
      takeaway:
        'Understanding architectural trade-offs is crucial for system design interviews.',
    },
    {
      questionId: 'q2',
      prompt: 'Describe a time you had a conflict with a teammate. How did you resolve it?',
      category: 'behavioral',
      selectedOption: 'I avoided the issue until it went away',
      correctOption:
        'I initiated a private conversation, listened to their perspective, found common ground, and agreed on action items.',
      isCorrect: false,
      explanation:
        'Avoidance is a passive strategy. Strong candidates demonstrate active conflict resolution using empathy and structured communication.',
      takeaway:
        'Practice the STAR method for behavioral answers: Situation, Task, Action, Result.',
    },
    {
      questionId: 'q3',
      prompt: 'Which HTTP status code indicates that a resource has been permanently moved?',
      category: 'technical',
      selectedOption: '301 Moved Permanently',
      correctOption: '301 Moved Permanently',
      isCorrect: true,
      explanation:
        '301 tells clients and search engines the resource has a new permanent URI. 302 is for temporary redirects.',
      takeaway: 'Know common HTTP status codes and their semantic differences.',
    },
    {
      questionId: 'q4',
      prompt: 'How do you ensure your communication is clear when presenting technical concepts to non-technical stakeholders?',
      category: 'communication',
      selectedOption: 'I use analogies, visual aids, and avoid jargon',
      correctOption: 'I use analogies, visual aids, and avoid jargon',
      isCorrect: true,
      explanation:
        'Translating technical concepts into relatable terms shows communication maturity and empathy for the audience.',
      takeaway:
        "Great communicators adapt their message to the audience's context.",
    },
    {
      questionId: 'q5',
      prompt: 'When planning a sprint, what is the most important factor to consider?',
      category: 'planning',
      selectedOption: 'Completing as many tasks as possible',
      correctOption:
        'Team capacity, priority of backlog items, and realistic estimation of effort.',
      isCorrect: false,
      explanation:
        'Sprint planning is about sustainable pace and value delivery, not volume. Overloading a sprint leads to burnout and missed deadlines.',
      takeaway:
        'Focus on delivering high-value increments with realistic scope.',
    },
  ],
};

export const sampleSession: InterviewSession = {
  config: {
    role: 'Full-Stack Developer',
    level: 'Mid-Senior',
  },
};
