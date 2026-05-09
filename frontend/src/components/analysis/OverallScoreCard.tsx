import type { AnalysisResult, InterviewSession } from './types.ts';

interface OverallScoreCardProps {
  analysis: AnalysisResult;
  session: InterviewSession;
}

export default function OverallScoreCard({ analysis, session }: OverallScoreCardProps) {
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (analysis.overallScore / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] rounded-2xl p-5 h-100 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/8 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col justify-between min-h-full">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
              <span className="material-symbols-outlined text-sm">work</span>
              {session.config.role}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
              <span className="material-symbols-outlined text-sm">quiz</span>
              {analysis.categoryScores.reduce((sum, s) => sum + s.total, 0)} Questions
            </span>
          </div>

          <div className="text-xs font-bold uppercase mb-2 text-white/75 tracking-wider">
            Overall Score
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative inline-flex items-center justify-center">
              <svg width="110" height="110" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  className="text-white/20"
                  cx="50"
                  cy="50"
                  r="44"
                  strokeWidth="7"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  strokeWidth="7"
                  stroke="white"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{analysis.overallScore}</span>
                <span className="text-xs text-white/75 font-semibold uppercase tracking-wide">Score</span>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white mb-1">{analysis.readinessLabel}</div>
              <div className="text-sm text-white/75">Based on your latest session</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm mt-2 text-white/90">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span><strong>Strongest:</strong> {formatCategoryName(analysis.strongestCategory)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">trending_down</span>
            <span><strong>Needs work:</strong> {formatCategoryName(analysis.weakestCategory)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCategoryName(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
