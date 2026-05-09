const features = [
  "Real-time AI behavioral analysis",
  "Industry-specific question banks",
  "Detailed performance reports",
];

export default function LeftPanel() {
  return (
    <div className="relative flex-1 hidden lg:flex min-h-screen bg-[#111827] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#0A0A0F] to-[#111827]" />

      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#7C3AED]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-12 flex flex-col justify-center max-w-lg">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white flex items-center justify-center text-[#7C3AED] flex-shrink-0">
            <span className="material-symbols-outlined text-xl sm:text-2xl">
              psychology
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">
            Interview Pro AI With SkillForge
          </h1>
        </div>

        {/* Main heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 sm:mb-6">
          Master your next big <span className="gradient-text">career move</span>
        </h2>

        <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 lg:mb-10">
          Practice with our advanced AI interviewers and get real-time feedback
          on your performance, body language, and content.
        </p>

        {/* Features */}
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 mb-4 sm:mb-5 last:mb-0">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-sm text-[#7C3AED]">
                check
              </span>
            </div>
            <p className="text-white font-medium text-sm sm:text-base">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
