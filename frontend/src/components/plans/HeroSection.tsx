export default function HeroSection() {
  return (
    <section className="py-8 sm:py-12 text-center px-0">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
          Pricing Plans
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight px-4">
          Choose the right plan for{" "}
          <span className="gradient-text">your career goals</span>
        </h1>

        <p className="text-[#A1A1AA] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
          Unlock your potential with our AI-powered mock interview platform.
          Choose a plan that fits your journey from preparation to landing
          your dream job.
        </p>
      </div>
    </section>
  );
}
