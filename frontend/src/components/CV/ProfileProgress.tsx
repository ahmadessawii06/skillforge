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
                    <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", color: "#a78bfa", margin: "0 0 6px" }}>
                        STEP {step} OF {STEPS.length}
                    </p>
                    <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: "#1a1033" }}>
                        Create your <em style={{ fontStyle: "italic", color: "#7c3aed" }}>profile</em>
                    </h1>
                </div>
                <span style={{ fontSize: 13, color: "#a78bfa" }}>{percent}% complete</span>
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
                                background: i + 1 < step ? "#ede9fe" : i + 1 === step ? "#7c3aed" : "white",
                                border: i + 1 < step ? "1px solid #c4b5fd" : i + 1 === step ? "1px solid #7c3aed" : "1px solid #e5e7eb",
                                color: i + 1 < step ? "#6d28d9" : i + 1 === step ? "white" : "#9ca3af",
                                transition: "all 0.3s ease",
                            }}>
                                <i className={`ti ${s.icon}`} aria-hidden="true" />
                            </div>
                            <span style={{
                                fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                                color: i + 1 === step ? "#7c3aed" : "#9ca3af",
                            }}>
                                {s.label.toUpperCase()}
                            </span>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div style={{
                                flex: 1, height: 1, marginBottom: 22,
                                background: i + 1 < step ? "#c4b5fd" : "#e5e7eb",
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