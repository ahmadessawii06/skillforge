interface InterviewStatsProps {
  completionPercentage: number;
  answeredCount: number;
  totalQuestions: number;
}

export default function InterviewStats({
  completionPercentage,
  answeredCount,
  totalQuestions,
}: InterviewStatsProps) {
  const remainingCount = totalQuestions - answeredCount;

  return (
    <div className="bg-[#1E293B] rounded-2xl border border-white/[0.06] p-5">
      <h3 className="font-bold text-white mb-5 text-base">Interview Stats</h3>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-center text-sm font-semibold mb-2">
            <span className="text-[#71717A] uppercase">Completion</span>
            <span className="text-white">{completionPercentage}%</span>
          </div>
          <div
            className="h-2 rounded-full"
            style={{ backgroundColor: "#111827" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${completionPercentage}%`,
                backgroundColor: "#7C3AED",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-white/[0.06] pb-2">
            <span className="text-xs font-bold text-[#71717A] uppercase">
              Answered
            </span>
            <span className="font-mono font-bold text-white">
              {answeredCount} / {totalQuestions}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#71717A] uppercase">
              Remaining
            </span>
            <span className="font-mono font-bold text-white">
              {remainingCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
