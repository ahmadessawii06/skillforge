interface QuestionCardProps {
  tags: string[];
  questionNumber: number;
  questionText: string;
}

export default function QuestionCard({ tags, questionNumber, questionText }: QuestionCardProps) {
  return (
    <div className="bg-[#1E293B] rounded-2xl border border-white/[0.06] p-5 md:p-6 lg:p-8">
      <div className="flex gap-2 mb-5 flex-wrap">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="badge bg-[#7C3AED]/15 text-[#A1A1AA] font-semibold px-3 py-2 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-lg md:text-xl font-bold text-white mb-4">
        Question {questionNumber}
      </h2>
      <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed">
        {questionText}
      </p>
    </div>
  );
}
