interface QuestionOverviewItem {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
  isCorrect?: boolean;
}

interface QuestionsOverviewProps {
  questions: QuestionOverviewItem[];
}

export default function QuestionsOverview({ questions }: QuestionsOverviewProps) {
  return (
    <div className="bg-[#1E293B] rounded-2xl border border-white/[0.06] p-5">
      <h3 className="font-bold text-white mb-4 text-base">
        Questions Overview
      </h3>
      <div className="flex flex-col gap-2">
        {questions.map((q, index) => {
          const questionNumber = index + 1;
          let cardClass = "bg-[#1E293B] border-white/[0.06]";
          let iconColor = "";
          let icon = "";

          if (q.completed && q.isCorrect) {
            cardClass = "bg-[#059669]/10 border-[#059669]/30";
            iconColor = "#059669";
            icon = "check_circle";
          } else if (q.completed && !q.isCorrect) {
            cardClass = "bg-[#dc2626]/10 border-[#dc2626]/30";
            iconColor = "#dc2626";
            icon = "error";
          } else if (q.current) {
            cardClass = "bg-[#7C3AED]/10 border-[#7C3AED] border-2";
          }

          return (
            <div
              key={q.id}
              className={`p-3 rounded-xl border transition-all flex justify-between items-center ${cardClass}`}
              style={{ transition: "all 0.3s ease" }}
            >
              <div className="flex items-center gap-2">
                {q.completed && icon && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px", color: iconColor }}
                  >
                    {icon}
                  </span>
                )}
                <div>
                  <span className="font-bold text-white text-sm block">
                    Question {questionNumber}
                  </span>
                  <span className="text-xs text-[#71717A]">{q.title}</span>
                </div>
              </div>
              {q.current && (
                <span className="badge px-3 py-1.5 rounded-lg text-xs font-bold bg-[#7C3AED] text-white">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#059669]"
              style={{ fontSize: "16px" }}
            >
              check_circle
            </span>
            <span className="text-[#71717A]">Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#dc2626]"
              style={{ fontSize: "16px" }}
            >
              error
            </span>
            <span className="text-[#71717A]">Incorrect</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#7C3AED" }}
            />
            <span className="text-[#71717A]">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}
