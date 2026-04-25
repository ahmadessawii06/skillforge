import { useNavigate } from 'react-router-dom';
import OverallScoreCard from './OverallScoreCard';
import CategoryScoreCard from './CategoryScoreCard';
import CategoryRadarChart from './CategoryRadarChart';
import AnswerReviewCard from './AnswerReviewCard';
import { sampleAnalysis, sampleSession } from './sampleData';
import './styles.css';

export default function AnalysisPage() {
  const navigate = useNavigate();

  // Use sample data — replace with real API data in production
  const analysis = sampleAnalysis;
  const session = sampleSession;

  return (
    <div className="analysis-page">
      <div className="container">
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: 'var(--analysis-text)', fontSize: '1.75rem' }}>
              Analysis Center
            </h1>
            <p className="mb-0" style={{ color: 'var(--analysis-text-muted)', fontSize: '0.9rem' }}>
              Review your latest session performance and identify areas for improvement.
            </p>
          </div>
          <div className="d-flex gap-2 flex-shrink-0">
            <button
              className="analysis-btn-outline d-flex align-items-center gap-2"
              onClick={() => navigate('/plans')}
              type="button"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_month</span>
              Practice Plan
            </button>
            <button
              className="analysis-btn-primary d-flex align-items-center gap-2"
              onClick={() => navigate('/ai')}
              type="button"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>
              New Round
            </button>
          </div>
        </div>

        {/* Top Row: Overall Score + Category Scores */}
        <div className="row g-3 g-lg-4 mb-4">
          <div className="col-lg-4">
            <OverallScoreCard analysis={analysis} session={session} />
          </div>
          <div className="col-lg-8">
            <div className="row g-3">
              {analysis.categoryScores.map((score, idx) => (
                <div className="col-sm-6" key={score.category}>
                  <CategoryScoreCard score={score} index={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Row: Radar Chart + Answer Reviews */}
        <div className="row g-3 g-lg-4">
          <div className="col-xl-5 col-lg-6">
            <CategoryRadarChart categoryScores={analysis.categoryScores} />
          </div>
          <div className="col-xl-7 col-lg-6">
            <div className="analysis-card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="analysis-section-title mb-0">Answer Review</h2>
                  <span
                    className="badge rounded-pill"
                    style={{
                      background: 'var(--analysis-primary-light)',
                      color: 'var(--analysis-primary)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  >
                    {analysis.answerReviews.length} Questions
                  </span>
                </div>
                <div className="d-flex flex-column gap-3">
                  {analysis.answerReviews.map((review, index) => (
                    <AnswerReviewCard key={review.questionId} review={review} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
