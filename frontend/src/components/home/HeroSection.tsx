import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 bg-[#1E293B] border border-white/[0.06] text-white mt-16 sm:mt-20 overflow-hidden min-h-[280px] sm:min-h-[320px]">
      {/* Content */}
      <div className="relative z-10 max-w-full sm:max-w-xl md:max-w-2xl">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 text-white leading-tight">
          Welcome back, Ready to practice?
        </h1>
        <p className="text-[#A1A1AA] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
          Sharpen your skills with our AI-powered mock interviews and get real-time feedback on your technical and behavioral performance.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/cv">
            <button className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base min-w-[140px] sm:w-auto">
              Start New Interview
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_right</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Background SVG - Hidden on very small screens */}
      <div className="hidden sm:block absolute top-0 right-0 w-1/3 h-full pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <g transform="translate(100 100)">
            <path
              className="animate-pulse"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.5,81.4,29,73.1,42.1C64.8,55.1,53.8,66.8,40.5,74.1C27.2,81.3,13.6,84.1,-0.5,85C-14.6,85.9,-29.2,84.8,-42.8,78.2C-56.4,71.6,-69,59.4,-77.4,45.3C-85.9,31.2,-90.1,15.6,-89.4,0.4C-88.7,-14.8,-83.1,-29.6,-74.3,-43.1C-65.4,-56.6,-53.4,-68.8,-39.7,-76.3C-26,-83.8,-13,-86.6,0.3,-87.1C13.6,-87.6,27.2,-85.8,44.7,-76.4Z"
              fill="rgba(124, 58, 237, 0.15)"
            />
          </g>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="font-['Pacifico'] text-3xl sm:text-4xl md:text-5xl text-[#7C3AED] font-bold drop-shadow-lg">
            SkillForge
          </span>
        </div>
      </div>
    </section>
  );
}
