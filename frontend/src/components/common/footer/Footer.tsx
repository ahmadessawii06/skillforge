import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#7C3AED] text-2xl">
                psychology
              </span>
              <span className="font-['Pacifico'] text-xl text-white">
                SkillForge
              </span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              AI-powered platform to analyze skills, CVs, and improve your career path.
            </p>
            <p className="text-[#A1A1AA] text-sm mt-2">
              Try AI Interview!
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pages</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Upload CV", "Interview", "Analysis", "Plans"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(" ", "")}`}
                  className="text-[#A1A1AA] text-sm hover:text-[#7C3AED] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/ahmadessawii06/skillforge"
                target="_blank"
                rel="noreferrer"
                className="text-[#A1A1AA] text-sm hover:text-[#7C3AED] transition-colors inline-flex items-center gap-2"
              >
                <i className="fab fa-github text-lg"></i>
                GitHub
              </a>
              <Link
                to="/team"
                className="text-[#A1A1AA] text-sm hover:text-[#7C3AED] transition-colors"
              >
                Our Team
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8">
          <p className="text-[#A1A1AA] text-sm text-center">
            &copy; 2026 SkillForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
