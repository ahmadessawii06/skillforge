type ProfileProgressProps = {
  step: number;
};

const STEPS = ["Upload CV", "Job Target", "Preferences"];

export default function ProfileProgress({ step }: ProfileProgressProps) {
  const percent = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="mb-6">
      <p className="text-[#7C3AED] font-bold mb-2 text-xs tracking-wider">
        STEP {step} OF {STEPS.length}
      </p>
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold mb-0 text-xl text-white">Create your profile</h1>
        <span className="text-[#71717A] text-sm">{percent}% Complete</span>
      </div>
      <div className="h-1.5 bg-[#111827] rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-[#7C3AED] rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`text-xs tracking-wider ${
              i + 1 < step
                ? "text-[#7C3AED]"
                : i + 1 === step
                ? "text-[#7C3AED] font-bold"
                : "text-[#71717A]"
            }`}
          >
            {i + 1}. {label.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
