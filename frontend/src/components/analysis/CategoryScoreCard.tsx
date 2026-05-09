import type { CategoryScore } from './types.ts';

interface CategoryScoreCardProps {
  score: CategoryScore;
  index: number;
}

const CATEGORY_ICONS: Record<string, { icon: string; color: string }> = {
  technical: { icon: 'code', color: '#7C3AED' },
  behavioral: { icon: 'groups', color: '#10B981' },
  communication: { icon: 'forum', color: '#F59E0B' },
  planning: { icon: 'calendar_month', color: '#EF4444' },
};

function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981';
  if (score >= 60) return '#7C3AED';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
}

function formatCategoryName(category: string): string {
  return category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryScoreCard({ score }: CategoryScoreCardProps) {
  const iconConfig = CATEGORY_ICONS[score.category] ?? { icon: 'category', color: '#7C3AED' };
  const scoreColor = getScoreColor(score.score);

  return (
    <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-4 h-full">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${iconConfig.color}15` }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: iconConfig.color }}
          >
            {iconConfig.icon}
          </span>
        </div>
        <div className="flex-grow-1">
          <h3 className="text-sm font-bold text-white mb-0">
            {formatCategoryName(score.category)}
          </h3>
          <span className="text-xs text-[#71717A]">{score.correct}/{score.total} correct</span>
        </div>
        <span className="text-2xl font-bold text-white">{score.score}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#111827]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score.score}%`, backgroundColor: scoreColor }}
        />
      </div>
    </div>
  );
}
