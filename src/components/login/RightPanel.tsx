
import React, { type MouseEvent } from "react";
import LoginForm from "./LoginForm";
const PRIMARY = "#1152d4";

const footerLinks: string[] = ["Privacy Policy", "Terms of Service", "Help Center"];

export default function RightPanel(): React.ReactElement {
  return (
    <div
      style={{
        flex: 1,
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
            Please enter your details to access your dashboard.
          </p>
        </div>

        <LoginForm />

        {/* Sign Up */}
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#64748b",
            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <a
            href="#"
            style={{ color: PRIMARY, fontWeight: 700, textDecoration: "none" }}
          >
            Sign Up
          </a>
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
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "#475569")
              }
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "#94a3b8")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
