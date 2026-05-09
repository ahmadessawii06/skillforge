import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import OverallScoreCard from './OverallScoreCard.tsx';
import CategoryScoreCard from './CategoryScoreCard.tsx';
import CategoryRadarChart from './CategoryRadarChart.tsx';
import AnswerReviewCard from './AnswerReviewCard.tsx';
import AnalysisEmpty from './AnalysisEmpty.tsx';
import { sampleSession } from './sampleData.ts';
import { useAnalysis } from '../../../hooks/useAnalysis.ts';
import type { AnalysisResult } from './types.ts';

export default function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const interviewId = parseInterviewId(searchParams.get('interviewId'));
  const state = location.state as { analysis?: AnalysisResult } | null;
  const { data, loading, error, needsGeneration } = useAnalysis(interviewId);

  const analysis = state?.analysis || data;
  const session = sampleSession;

  if (!interviewId && !analysis) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] flex items-center justify-center pt-20">
        <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-6 text-center max-w-md">
          <AnalysisEmpty />
        </div>
      </main>
    );
  }

  if (loading && !analysis) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pt-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-8 text-center">
            <p className="text-[#A1A1AA]">Loading interview analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pt-28 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              {needsGeneration ? 'Analysis Is Not Ready Yet' : 'Could Not Load Analysis'}
            </h2>
            <p className="text-[#A1A1AA] mb-6">
              {error || 'Finish the interview from the AI page so SkillForge can generate this report.'}
            </p>
            <button
              className="bg-[#7C3AED] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6D28D9] transition-colors"
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
    <div className="min-h-screen bg-[#0A0A0F] pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Analysis Center</h1>
            <p className="text-[#A1A1AA] text-sm">
              Review your latest session performance and identify areas for improvement.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-white/[0.2] text-[#A1A1AA] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
              onClick={() => navigate('/plans')}
              type="button"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              Practice Plan
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-all"
              onClick={() => navigate('/interview')}
              type="button"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              New Round
            </button>
          </div>
        </div>

        {/* Top Row: Overall Score + Category Scores */}
        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-4">
            <OverallScoreCard analysis={analysis} session={session} />
          </div>
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {analysis.categoryScores.map((score, idx) => (
                <CategoryScoreCard key={score.category} score={score} index={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Row: Radar Chart + Answer Reviews */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <CategoryRadarChart categoryScores={analysis.categoryScores} />
          </div>
          <div className="lg:col-span-7">
            <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-white">Answer Review</h2>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#7C3AED]/15 text-[#7C3AED]">
                  {analysis.answerReviews.length} Questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {analysis.answerReviews.map((review, index) => (
                  <AnswerReviewCard key={review.questionId} review={review} index={index} />
                ))}
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
