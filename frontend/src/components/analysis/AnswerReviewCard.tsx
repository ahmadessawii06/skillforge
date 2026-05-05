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
    <div
      className="analysis-review-item p-3 p-md-4"
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="review-question-number">Q{index + 1}</span>
          <span className="review-category">{formatCategoryName(review.category)}</span>
        </div>
        <span className={`review-badge ${review.isCorrect ? 'badge-correct' : 'badge-incorrect'}`}>
          {review.isCorrect ? '✓ Correct' : '✗ Needs Work'}
        </span>
      </div>


      <div className="d-flex flex-column gap-2">
        <p className="review-detail mb-0">
          <strong>Your answer:</strong> {review.selectedOption}
        </p>
        {!review.isCorrect && (
          <p className="review-detail mb-0">
            <strong>Best answer:</strong> {review.correctOption}
          </p>
        )}
        <p className="review-detail mb-0">
          <strong>Explanation:</strong> {review.explanation}
        </p>
        <p className="review-detail mb-0" style={{ opacity: 0.8 }}>
          <strong>Takeaway:</strong> {review.takeaway}
        </p>
      </div>
    </div>
  );
}
