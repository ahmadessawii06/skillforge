import type { CategoryScore } from './types.ts';

interface CategoryScoreCardProps {
  score: CategoryScore;
  index: number;
}

const CATEGORY_ICONS: Record<string, { icon: string; colorClass: string }> = {
  technical: { icon: 'code', colorClass: 'icon-indigo' },
  behavioral: { icon: 'groups', colorClass: 'icon-emerald' },
  communication: { icon: 'forum', colorClass: 'icon-amber' },
  planning: { icon: 'calendar_month', colorClass: 'icon-rose' },
};

function getScoreFillClass(score: number): string {
  if (score >= 80) return 'fill-excellent';
  if (score >= 60) return 'fill-good';
  if (score >= 40) return 'fill-average';
  return 'fill-poor';
}

function formatCategoryName(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryScoreCard({ score, index }: CategoryScoreCardProps) {
  const iconConfig = CATEGORY_ICONS[score.category] ?? { icon: 'category', colorClass: 'icon-indigo' };

  return (
    <div
      className="analysis-card analysis-category-card h-100"
    >
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className={`category-icon ${iconConfig.colorClass}`}>
            <span className="material-symbols-outlined">{iconConfig.icon}</span>
          </div>
          <div className="flex-grow-1">
            <h3 className="h6 fw-bold mb-0">{formatCategoryName(score.category)}</h3>
            <span className="category-ratio">{score.correct}/{score.total} correct</span>
          </div>
          <span className="category-score-big">{score.score}%</span>
        </div>
        <div className="analysis-progress-track">
          <div
            className={`analysis-progress-fill ${getScoreFillClass(score.score)}`}
            style={{ width: `${score.score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
