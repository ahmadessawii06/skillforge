import React, { useState, type FocusEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginOrCreateUser } from "../../../services/authService";

const PRIMARY = "#7C3AED";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      await loginOrCreateUser({ email, password });
      navigate("/home");
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      {/* Email */}
      <div className="mb-5 sm:mb-6">
        <label
          htmlFor="email"
          className="block font-semibold text-sm text-white mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="name@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field w-full"
          style={{
            backgroundColor: "#1E293B",
            border: "1px solid #27272A",
          }}
        />
      </div>

      {/* Password */}
      <div className="mb-5 sm:mb-6">
        <label
          htmlFor="password"
          className="block font-semibold text-sm text-white mb-2"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field w-full pr-12"
            style={{
              backgroundColor: "#1E293B",
              border: "1px solid #27272A",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center p-2"
          >
            <span className="material-symbols-outlined text-xl">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-[#EF4444] text-sm -mt-2 mb-4">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 sm:py-4 px-6 rounded-lg font-bold text-sm text-white transition-all duration-200 min-h-[44px] touch-target ${
          loading
            ? "bg-[#71717A] cursor-not-allowed"
            : "bg-[#7C3AED] hover:bg-[#6D28D9] hover:shadow-glow"
        }`}
      >
        {loading ? "Signing in..." : "Continue"}
      </button>
    </form>
  );
};

export default function RightPanel() {
  const footerLinks = ["Privacy Policy", "Terms of Service", "Help Center"];

  return (
    <div className="flex-1 min-h-screen bg-[#0A0A0F] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
            Welcome back
          </h2>
          <p className="text-[#A1A1AA] text-sm">
            Enter your email and password. New emails are created automatically.
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-[#A1A1AA] text-sm mt-6 sm:mt-8">
          No separate sign-up needed.
        </p>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#71717A] text-xs hover:text-[#7C3AED] transition-colors text-center"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object") {
    const maybeError = error as { message?: unknown; error?: unknown };
    if (typeof maybeError.message === "string") return maybeError.message;
    if (typeof maybeError.error === "string") return maybeError.error;
  }
  return "Login failed. Please try again.";
}
