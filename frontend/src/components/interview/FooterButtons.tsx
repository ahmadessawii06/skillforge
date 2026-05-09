interface FooterButtonsProps {
  onPrevious: () => void;
  onNextOrSubmit: () => void;
  isNext: boolean;
  isAnswerEvaluated: boolean;
  hasSelection: boolean;
  canGoPrevious?: boolean;
}

export default function FooterButtons({
  onPrevious,
  onNextOrSubmit,
  isNext,
  isAnswerEvaluated,
  hasSelection,
  canGoPrevious = false,
}: FooterButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-5">
      <button
        onClick={onPrevious}
        className="px-5 py-3 rounded-xl font-semibold text-sm bg-transparent border border-white/[0.2] text-[#A1A1AA] hover:bg-white/[0.05] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!canGoPrevious}
      >
        Previous Question
      </button>
      <button
        onClick={onNextOrSubmit}
        className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
          isAnswerEvaluated || hasSelection
            ? "bg-[#059669] text-white hover:bg-[#047857]"
            : "bg-[#9ca3af] text-white cursor-not-allowed"
        }`}
        disabled={!isAnswerEvaluated && !hasSelection}
      >
        <span className="material-symbols-outlined text-base">
          {isNext
            ? isAnswerEvaluated
              ? "arrow_forward"
              : "check_circle"
            : "check_circle"}
        </span>
        {isAnswerEvaluated
          ? isNext
            ? "Next Question"
            : "Submit Interview"
          : "Submit Answer"}
      </button>
    </div>
  );
}
