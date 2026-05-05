import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import OverallScoreCard from './OverallScoreCard.tsx';
import CategoryScoreCard from './CategoryScoreCard.tsx';
import CategoryRadarChart from './CategoryRadarChart.tsx';
import AnswerReviewCard from './AnswerReviewCard.tsx';
import AnalysisEmpty from './AnalysisEmpty.tsx';
import { sampleSession } from './sampleData.ts';
import { useAnalysis } from '../../../hooks/useAnalysis.ts';
import type { AnalysisResult } from './types.ts';
import './styles.css';

export default function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const interviewId = parseInterviewId(searchParams.get('interviewId'));
  const state = location.state as { analysis?: AnalysisResult } | null;
  const { data, loading, error, needsGeneration } = useAnalysis(interviewId);

  const analysis = state?.analysis || data;
  const session = sampleSession;

  // if (!interviewId && !analysis) {
  //   return <AnalysisEmpty />;
  // }


  if (!interviewId && !analysis) {
    return (
      <main className="bg-light">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="container bg-white rounded-5 shadow-sm border border-slate-200 p-4 text-center">
            <AnalysisEmpty />
          </div>
        </div>
      </main>

    );
  }
  if (loading && !analysis) {
    return (
      <div className="analysis-page">
        <div className="container">
          <div className="analysis-card p-5 text-center">
            <p className="mb-0" style={{ color: 'var(--analysis-text-muted)' }}>Loading interview analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="analysis-page">
        <div className="container">
          <div className="analysis-card p-5 text-center">
            <h2 className="h4 fw-bold mb-3" style={{ color: 'var(--analysis-text)' }}>
              {needsGeneration ? 'Analysis Is Not Ready Yet' : 'Could Not Load Analysis'}
            </h2>
            <p className="mb-4" style={{ color: 'var(--analysis-text-muted)' }}>
              {error || 'Finish the interview from the AI page so SkillForge can generate this report.'}
            </p>
            <button
              className="analysis-btn-primary"
              onClick={() => navigate('/cv')}
              type="button"
            >
              Start From CV
            </button>
          </div>
        </div>
      </div>
    );
  }



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

function parseInterviewId(value: string | null): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
