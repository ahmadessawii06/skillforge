import type { AnswerReview } from './types.ts';

interface AnswerReviewCardProps {
  review: AnswerReview;
  index: number;
}

function formatCategoryName(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AnswerReviewCard({ review, index }: AnswerReviewCardProps) {
  return (
    <div className="bg-[#18181B] border border-white/[0.06] rounded-xl p-4 hover:border-[#7C3AED]/30 transition-all">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/[0.06] text-[#71717A]">
            Q{index + 1}
          </span>
          <span className="text-sm text-[#71717A]">{formatCategoryName(review.category)}</span>
        </div>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            review.isCorrect
              ? 'bg-[rgba(16,185,129,0.12)] text-[#059669]'
              : 'bg-[rgba(239,68,68,0.12)] text-[#dc2626]'
          }`}
        >
          {review.isCorrect ? '✓ Correct' : '✗ Needs Work'}
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <p className="text-[#A1A1AA] mb-0">
          <strong className="text-white">Your answer:</strong> {review.selectedOption}
        </p>
        {!review.isCorrect && (
          <p className="text-[#A1A1AA] mb-0">
            <strong className="text-white">Best answer:</strong> {review.correctOption}
          </p>
        )}
        <p className="text-[#A1A1AA] mb-0">
          <strong className="text-white">Explanation:</strong> {review.explanation}
        </p>
        <p className="text-[#A1A1AA] mb-0" style={{ opacity: 0.8 }}>
          <strong className="text-white">Takeaway:</strong> {review.takeaway}
        </p>
      </div>
    </div>
  );
}
