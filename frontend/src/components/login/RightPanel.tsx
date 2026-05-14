import React, { useState, type FocusEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginOrCreateUser, registerUser } from "../../../services/authService";
import "../../pages/login/Login.css";
const PRIMARY = "#1152d4";

const labelStyle: React.CSSProperties = {
    display: "block", fontWeight: 600,
    fontSize: "0.875rem", color: "#0f172a", marginBottom: "0.5rem",
};

const inputBaseStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "0.875rem 1rem",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
};

function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object") {
        const e = error as { message?: unknown; error?: unknown };
        if (typeof e.message === "string") return e.message;
        if (typeof e.error === "string") return e.error;
    }
    return "Something went wrong. Please try again.";
}

// ─────────────────────────────────────────────
const AuthForm: React.FC<{ isSignUp: boolean; onToggle: (v: boolean) => void }> = ({
    isSignUp,
    onToggle,
}) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) { setError("Please enter email and password"); return; }
        if (isSignUp && !fullName.trim()) { setError("Please enter your full name"); return; }

        setLoading(true);
        try {
            let response;

            if (isSignUp) {

                response = await registerUser({
                    email,
                    password,
                    fullName
                });

            } else {

                response = await loginOrCreateUser({
                    email,
                    password
                });

            }

            localStorage.setItem("token", response.token);
            localStorage.setItem("fullName", response.user.fullName);
            navigate("/home");
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = PRIMARY;
        e.target.style.boxShadow = "0 0 0 3px rgba(17,82,212,0.15)";
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = "#e2e8f0";
        e.target.style.boxShadow = "none";
    };

    return (
        <form onSubmit={handleSubmit} noValidate>

            {/* Full Name — sign up only */}
            {isSignUp && (
                <div style={{ marginBottom: "1.5rem" }}>
                    <label htmlFor="fullName" style={labelStyle}>Full Name</label>
                    <input
                        id="fullName" type="text" placeholder="John Doe"
                        value={fullName} onChange={(e) => setFullName(e.target.value)}
                        style={inputBaseStyle} onFocus={handleFocus} onBlur={handleBlur}
                    />
                </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input
                    id="email" type="email" placeholder="example@skillforge.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    style={inputBaseStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                    <input
                        id="password" type={showPassword ? "text" : "password"}
                        placeholder="••••••••" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ ...inputBaseStyle, padding: "0.875rem 3rem 0.875rem 1rem" }}
                        onFocus={handleFocus} onBlur={handleBlur}
                    />
                    <button type="button" onClick={() => setShowPassword((p) => !p)}
                        style={{
                            position: "absolute", right: "1rem", top: "50%",
                            transform: "translateY(-50%)", background: "none",
                            border: "none", color: "#94a3b8", cursor: "pointer", padding: 0,
                            display: "flex", alignItems: "center",
                        }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "1.25rem" }}>
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <p style={{ color: "#dc2626", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                    {error}
                </p>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
                style={{
                    backgroundColor: loading ? "#94a3b8" : PRIMARY,
                    border: "none", borderRadius: "0.5rem", padding: "1rem 1.5rem",
                    fontSize: "0.875rem", fontWeight: 700, color: "white", width: "100%",
                    boxShadow: "0 4px 14px rgba(17,82,212,0.25)",
                    cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem",
                }}
                onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                    if (!loading) e.currentTarget.style.backgroundColor = "rgba(17,82,212,0.9)";
                }}
                onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                    if (!loading) e.currentTarget.style.backgroundColor = PRIMARY;
                }}
            >
                {loading
                    ? (isSignUp ? "Creating account..." : "Signing in...")
                    : (isSignUp ? "Create Account" : "Sign In")}
            </button>

            {/* Toggle link */}
            <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b", fontSize: "0.875rem" }}>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button type="button"
                    onClick={() => { onToggle(!isSignUp); setError(null); }}
                    style={{
                        background: "none", border: "none", color: PRIMARY,
                        fontWeight: 700, cursor: "pointer", fontSize: "0.875rem", padding: 0,
                    }}>
                    {isSignUp ? "Sign In" : "Sign Up"}
                </button>
            </p>
        </form>
    );
};

const RightPanel: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const footerLinks = ["Privacy Policy", "Terms of Service", "Help Center"];

    return (
        <div
            className="login-right-panel"
            style={{
                flex: "1 1 50%",
                minWidth: 0,
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #f8fbff 0%, #ffffff 45%, #eef5ff 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isSignUp ? "1rem 2rem" : "2rem 2rem",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    maxWidth: "30rem",
                    width: "100%",
                    margin: "0 auto",
                    transform: isSignUp
                        ? "translateY(0)"
                        : "translateY(-20px)",
                    background: "rgba(255,255,255,0.88)",
                    border: "1px solid #e5edff",
                    borderRadius: "1.5rem",
                    padding: isSignUp
                        ? "1.5rem 2.2rem"
                        : "2.5rem",
                    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
                    transition: "all 0.3s ease",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "#eff6ff",
                        color: PRIMARY,
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "999px",
                        marginBottom: "1.25rem",
                    }}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "1rem" }}
                    >
                        auto_awesome
                    </span>

                    AI Interview Trainer
                </div>

                <div
                    style={{
                        marginBottom: isSignUp
                            ? "1.2rem"
                            : "2rem",
                    }}
                >
                    <h2
                        className="login-heading"
                        style={{
                            fontWeight: 900,
                            fontSize: isSignUp
                                ? "1.8rem"
                                : "2rem",
                            lineHeight: 1.1,
                            color: "#0f172a",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Master Your Next Interview with AI
                    </h2>

                    <p
                        style={{
                            color: "#475569",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            margin: 0,
                        }}
                    >
                        Practice real interviews, get instant
                        feedback, and improve your confidence
                        before the real job interview.
                    </p>
                </div>

                <AuthForm
                    isSignUp={isSignUp}
                    onToggle={setIsSignUp}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, 1fr)",
                        gap: "0.75rem",
                        marginTop: isSignUp
                            ? "1rem"
                            : "1.75rem",
                    }}
                >
                    {[
                        ["AI", "Feedback"],
                        ["24/7", "Practice"],
                        ["CV", "Based"],
                    ].map(([top, bottom]) => (
                        <div
                            key={top}
                            style={{
                                background: "#f8fafc",
                                border:
                                    "1px solid #e2e8f0",
                                borderRadius: "1rem",
                                padding:
                                    isSignUp
                                        ? "0.7rem 0.4rem"
                                        : "0.9rem 0.5rem",
                                textAlign: "center",
                                transition:
                                    "all 0.3s ease",
                            }}
                        >
                            <div
                                style={{
                                    color: PRIMARY,
                                    fontWeight: 900,
                                    fontSize: "1rem",
                                }}
                            >
                                {top}
                            </div>

                            <div
                                style={{
                                    color: "#64748b",
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                }}
                            >
                                {bottom}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1.5rem",
                        marginTop: isSignUp
                            ? "1.2rem"
                            : "2rem",
                        flexWrap: "wrap",
                    }}
                >
                    {footerLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            style={{
                                color: "#94a3b8",
                                textDecoration: "none",
                                fontSize: "0.75rem",
                            }}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default RightPanel;