import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#A78BFA]/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
  </div>
);

const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/[0.06]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7C3AED] text-2xl sm:text-3xl">psychology</span>
            <span className="font-['Pacifico'] text-xl sm:text-2xl text-white">SkillForge</span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-').toLowerCase()}`} className="text-[#A1A1AA] hover:text-white transition-colors text-sm font-medium">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:inline-flex text-[#A1A1AA] hover:text-white transition-colors text-sm font-semibold">Sign In</Link>
            <Link to="/login" className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold transition-all duration-200">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="group p-6 sm:p-8 rounded-2xl bg-[#1E293B]/50 border border-white/[0.06] hover:border-[#7C3AED]/30 transition-all duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#7C3AED]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <span className="material-symbols-outlined text-[#7C3AED] text-2xl sm:text-3xl">{icon}</span>
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">{description}</p>
  </div>
);

const Landing = () => {
  const features = [
    { icon: 'psychology', title: 'AI-Powered Analysis', description: 'Our advanced AI analyzes your responses, tone, and body language to provide actionable insights in real-time.' },
    { icon: 'mic', title: 'Voice Recognition', description: 'Speak naturally while our AI evaluates your communication style, pace, and clarity.' },
    { icon: 'code', title: 'Technical Questions', description: 'Practice coding and technical questions tailored to your target role and experience level.' },
    { icon: 'trending_up', title: 'Progress Tracking', description: 'Monitor your improvement with detailed analytics and personalized feedback reports.' },
    { icon: 'groups', title: 'Behavioral Questions', description: 'Master STAR method responses to common behavioral interview questions.' },
    { icon: 'security', title: 'Industry Specific', description: 'Get questions customized to your industry, from tech to finance to healthcare.' }
  ];
  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50K+', label: 'Interviews Completed' },
    { value: '94%', label: 'Success Rate' },
    { value: '500+', label: 'Companies' }
  ];
  const steps = [
    { step: '01', title: 'Upload or Create Profile', description: 'Share your CV or enter your details to personalize your experience.' },
    { step: '02', title: 'Choose Your Role', description: 'Select the job role and industry you are preparing for.' },
    { step: '03', title: 'Practice & Learn', description: 'Answer AI-generated questions and get instant feedback.' },
    { step: '04', title: 'Track Progress', description: 'Review detailed analytics and improve with every session.' }
  ];
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <LandingNav />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-6 sm:mb-8">
            <span className="material-symbols-outlined text-[#7C3AED] text-sm">sparkles</span>
            <span className="text-[#7C3AED] text-xs sm:text-sm font-medium">AI-Powered Interview Training</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">Master Your Next<br /><span className="gradient-text">AI Interview</span></h1>
          <p className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed">Practice with our advanced AI interviewers and get real-time feedback on your performance. Land your dream job with confidence.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold transition-all duration-200 hover:shadow-glow-lg text-base sm:text-lg">Start Practicing Free</Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/[0.2] hover:border-white/[0.4] text-white font-semibold transition-all duration-200 text-base sm:text-lg flex items-center justify-center gap-2"><span className="material-symbols-outlined text-xl">play_circle</span>See How It Works</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[#71717A] font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="py-16 sm:py-24 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">Comprehensive tools and insights to help you ace every interview</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{features.map((f, i) => <FeatureCard key={i} {...f} />)}</div>
        </div>
      </section>
      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">How It Works</h2>
            <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">Get interview-ready in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl sm:text-7xl font-black text-[#7C3AED]/10 absolute -top-4 -left-2">{item.step}</div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-[#A1A1AA] text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 sm:py-24 bg-[#0A0A0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">Ready to Land Your Dream Job?</h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">Join thousands of professionals who have successfully prepared for their interviews with SkillForge.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#7C3AED] font-semibold hover:bg-white/90 transition-all duration-200 text-base sm:text-lg">Start Free Trial</Link>
                <a href="#pricing" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white text-white font-semibold hover:bg-white/10 transition-all duration-200 text-base sm:text-lg">View Pricing</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#111827] border-t border-white/[0.06] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-[#7C3AED] text-2xl">psychology</span><span className="font-['Pacifico'] text-xl text-white">SkillForge</span></div>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">AI-powered interview practice platform helping professionals land their dream jobs.</p>
              <div className="flex gap-4">{['twitter', 'linkedin', 'github'].map((s) => <a key={s} href="#" className="text-[#71717A] hover:text-white transition-colors"><i className={`fab fa-${s}`} /></a>)}</div>
            </div>
            {['Product', 'Company', 'Resources'].map((section, i) => (
              <div key={section}>
                <h4 className="text-white font-semibold mb-4 text-sm">{section}</h4>
                <ul className="space-y-2 text-sm text-[#A1A1AA]">
                  {['Features', 'Pricing', 'About'].slice(0, i + 2).map((item) => <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] mt-12 pt-8 text-center text-[#71717A] text-sm">© 2026 SkillForge. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
