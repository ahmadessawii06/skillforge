import React from "react";

type ProfileProgressProps = {
    step: number;
};

const STEPS = [
    { label: "Upload CV", icon: "ti-upload" },
    { label: "Job Target", icon: "ti-target" },
    { label: "Preferences", icon: "ti-adjustments-horizontal" },
];

const ProfileProgress = ({ step }: ProfileProgressProps) => {
    const percent = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

    return (
        <div style={{ paddingBottom: 24 }}>
            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div>
                    <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", color: "#93c5fd", margin: "0 0 6px" }}>
                        STEP {step} OF {STEPS.length}
                    </p>
                    <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: "#1a1033" }}>
                        Create your <em style={{ fontStyle: "italic", color: "#2563eb" }}>profile</em>
                    </h1>
                </div>
                <span style={{ fontSize: 13, color: "#93c5fd" }}>{percent}% complete</span>
            </div>

            {/* Stepper */}
            <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                {STEPS.map((s, i) => (
                    <React.Fragment key={s.label}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 16,
                                background: i + 1 < step ? "#dbeafe" : i + 1 === step ? "#2563eb" : "white",
                                border: i + 1 < step ? "1px solid #bfdbfe" : i + 1 === step ? "1px solid #2563eb" : "1px solid #e5e7eb",
                                color: i + 1 < step ? "#1d4ed8" : i + 1 === step ? "white" : "#9ca3af",
                                transition: "all 0.3s ease",
                            }}>
                                <i className={`ti ${s.icon}`} aria-hidden="true" />
                            </div>
                            <span style={{
                                fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                                color: i + 1 === step ? "#2563eb" : "#9ca3af",
                            }}>
                                {s.label.toUpperCase()}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div style={{
                                flex: 1, height: 1, marginBottom: 22,
                                background: i + 1 < step ? "#bfdbfe" : "#e5e7eb",
                                transition: "background 0.3s ease",
                            }} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProfileProgress;