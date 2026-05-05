import type { AnalysisResult, InterviewSession } from './types.ts';

interface OverallScoreCardProps {
  analysis: AnalysisResult;
  session: InterviewSession;
}

export default function OverallScoreCard({ analysis, session }: OverallScoreCardProps) {
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (analysis.overallScore / 100) * circumference;

  return (
    <div className="analysis-card analysis-hero h-100">
      <div className="card-body p-4 d-flex flex-column justify-content-between position-relative" style={{ zIndex: 1 }}>
        <div>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="analysis-meta-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>work</span>
              {session.config.role}
            </span>
            <span className="analysis-meta-pill">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>quiz</span>
              {analysis.categoryScores.reduce((sum, s) => sum + s.total, 0)} Questions
            </span>
          </div>

          <div className="small text-uppercase fw-bold mb-2" style={{ letterSpacing: '0.1em', opacity: 0.75 }}>
            Overall Score
          </div>

          <div className="d-flex align-items-center gap-4 mb-3">
            <div className="analysis-score-ring">
              <svg width="110" height="110" viewBox="0 0 100 100">
                <circle className="ring-track" cx="50" cy="50" r="44" strokeWidth="7" />
                <circle
                  className="ring-fill"
                  cx="50"
                  cy="50"
                  r="44"
                  strokeWidth="7"
                  strokeDasharray={`${circumference}`}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="analysis-score-value">
                <span className="analysis-score-number">{analysis.overallScore}</span>
                <span className="analysis-score-label">Score</span>
              </div>
            </div>
            <div>
              <div className="fs-5 fw-bold mb-1">{analysis.readinessLabel}</div>
              <div className="text-muted-light small">Based on your latest session</div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-2 small mt-2">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '18px', opacity: 0.8 }}>trending_up</span>
            <span><strong>Strongest:</strong> {formatCategoryName(analysis.strongestCategory)}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '18px', opacity: 0.8 }}>trending_down</span>
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
