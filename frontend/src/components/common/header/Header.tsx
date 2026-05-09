import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/cv", label: "Upload CV" },
  { to: "/interview", label: "Interview" },
  { to: "/analysis", label: "Analysis" },
  { to: "/plans", label: "Plans" },
  { to: "/team", label: "Team" },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="material-symbols-outlined text-[#7C3AED] text-2xl sm:text-3xl">
                psychology
              </span>
              <Link
                to=""
                className="font-['Pacifico'] text-lg sm:text-2xl text-white no-underline hover:text-[#7C3AED] transition-colors"
              >
                SkillForge
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/[0.1] text-white"
                        : "text-[#A1A1AA] hover:text-white hover:bg-white/[0.05]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Logout */}
            <Link
              to="/"
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-[rgba(124,58,237,0.15)] hover:bg-[#7C3AED] transition-all duration-200"
            >
              Log out
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/[0.1] transition-colors touch-target flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-white text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Menu */}
          <div className="fixed top-0 right-0 h-full w-full max-w-xs bg-[#111827] border-l border-white/[0.06] z-50 lg:hidden shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.06]">
                <span className="font-['Pacifico'] text-xl text-white">SkillForge</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/[0.1] transition-colors touch-target"
                >
                  <span className="material-symbols-outlined text-white text-2xl">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/[0.05] transition-all duration-200 mb-2 touch-target"
                  >
                    <span className="material-symbols-outlined text-[#7C3AED] text-xl">
                      {to === "/home" ? "home" :
                       to === "/cv" ? "description" :
                       to === "/interview" ? "psychology" :
                       to === "/analysis" ? "analytics" :
                       to === "/plans" ? "list" :
                       "group"}
                    </span>
                    <span className="font-medium text-base">{label}</span>
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-white/[0.06]">
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl font-semibold text-white bg-[#7C3AED]/15 hover:bg-[#7C3AED] transition-all duration-200 touch-target"
                >
                  <span className="material-symbols-outlined">logout</span>
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
