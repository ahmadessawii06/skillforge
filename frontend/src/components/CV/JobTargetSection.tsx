import { useState } from "react";
import React from "react";

const INDUSTRIES = [
    "Software & Technology",
    "Finance & Banking",
    "Healthcare",
    "Marketing & Advertising",
    "Education",
    "Engineering",
    "Design & Creative",
    "Sales & Business Development",
];

interface JobTargetSectionProps {
    jobTitle: string;
    setJobTitle: React.Dispatch<React.SetStateAction<string>>;
}

const JobTargetSection: React.FC<JobTargetSectionProps> = ({ jobTitle, setJobTitle }) => {
    const [industry, setIndustry] = useState("Software & Technology");
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
                border: "1px solid rgba(37,99,235,0.1)",
                borderRadius: 20,
                padding: 28,
                marginBottom: 16,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered
                    ? "0 12px 32px rgba(37,99,235,0.15)"
                    : "0 2px 12px rgba(37,99,235,0.06)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                    width: 40, height: 40,
                    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                    borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round"/>
                    </svg>
                </div>
                <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#1a1033" }}>Job Target</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#93c5fd", fontWeight: 500 }}>Tell us what you're aiming for</p>
                </div>
            </div>

            {/* Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8", marginBottom: 7, display: "block", letterSpacing: "0.02em" }}>
                        Target Industry
                    </label>
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        style={{
                            width: "100%",
                            border: "1.5px solid #bfdbfe",
                            borderRadius: 11,
                            padding: "11px 14px",
                            fontSize: 14,
                            color: "#1a1033",
                            background: "white",
                            outline: "none",
                            fontFamily: "inherit",
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = "#3b82f6";
                            e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = "#bfdbfe";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        {INDUSTRIES.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8", marginBottom: 7, display: "block", letterSpacing: "0.02em" }}>
                        Specific Job Title
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Senior Frontend Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        style={{
                            width: "100%",
                            border: "1.5px solid #bfdbfe",
                            borderRadius: 11,
                            padding: "11px 14px",
                            fontSize: 14,
                            color: "#1a1033",
                            background: "white",
                            outline: "none",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = "#3b82f6";
                            e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)";
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = "#bfdbfe";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default JobTargetSection;