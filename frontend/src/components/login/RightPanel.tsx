import React, { useState, type FocusEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginOrCreateUser } from "../../../services/authService";

const PRIMARY = "#1152d4";

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
        
        // Validation
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
    const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
        e.target.style.borderColor = PRIMARY;
        e.target.style.boxShadow = "0 0 0 3px rgba(17,82,212,0.15)";
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
        e.target.style.borderColor = "#e2e8f0";
        e.target.style.boxShadow = "none";
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        padding: "0.875rem 1rem",
        fontSize: "0.875rem",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s, box-shadow 0.2s",
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: "1.5rem" }}>
                <label
                    htmlFor="email"
                    style={{
                        display: "block",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "#0f172a",
                        marginBottom: "0.5rem",
                    }}
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
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ marginBottom: "0.5rem" }}>
                    <label
                        htmlFor="password"
                        style={{
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: "#0f172a",
                            margin: 0,
                        }}
                    >
                        Password
                    </label>
                </div>
                <div style={{ position: "relative" }}>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ ...inputStyle, padding: "0.875rem 3rem 0.875rem 1rem" }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label="Toggle password visibility"
                        style={{
                            position: "absolute",
                            right: "1rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.25rem" }}
                        >
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </button>
                </div>
            </div>

            {error && (
                <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "-0.5rem" }}>
                    {error}
                </p>
            )}

            {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? "#94a3b8" : PRIMARY,
                        border: "none",
                        borderRadius: "0.5rem",
                        padding: "1rem 1.5rem",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "white",
                        width: "100%",
                        boxShadow: "0 4px 14px rgba(17,82,212,0.25)",
                        cursor: loading ? "not-allowed" : "pointer",
                        marginTop: "0.5rem",
                    }}
                    onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.backgroundColor = "rgba(17,82,212,0.9)";
                    }}
                    onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.backgroundColor = PRIMARY;
                    }}
                >
                {loading ? "Signing in..." : "Continue"}
            </button>
        </form>
    );
};

const RightPanel: React.FC = () => {
    const footerLinks: string[] = ["Privacy Policy", "Terms of Service", "Help Center"];

    return (
        <div
            style={{
                flex: "1 1 50%",
                minWidth: 0,
                minHeight: "100vh",
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "3rem 2rem",
            }}
        >
            <div style={{ maxWidth: "28rem", width: "100%", margin: "0 auto" }}>
                {/* Heading */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2
                        style={{
                            fontWeight: 900,
                            fontSize: "2rem",
                            color: "#0f172a",
                            marginBottom: "0.25rem",
                        }}
                    >
                        Welcome back
                    </h2>
                    <p style={{ color: "#64748b", margin: 0 }}>
                        Enter your email and password. New emails are created automatically.
                    </p>
                </div>

                <LoginForm />

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "2rem",
                        color: "#64748b",
                        fontSize: "0.875rem",
                    }}
                >
                    No separate sign-up needed.
                </p>

                {/* Footer Links */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1.5rem",
                        marginTop: "2rem",
                    }}
                >
                    {footerLinks.map((link: string) => (
                        <a
                            key={link}
                            href="#"
                            style={{
                                color: "#94a3b8",
                                textDecoration: "none",
                                fontSize: "0.75rem",
                                transition: "color 0.2s",
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

function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object") {
        const maybeError = error as { message?: unknown; error?: unknown };
        if (typeof maybeError.message === "string") return maybeError.message;
        if (typeof maybeError.error === "string") return maybeError.error;
    }

    return "Login failed. Please try again.";
}
