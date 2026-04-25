import React from 'react';

const PRIMARY = "#1152d4";

const features: string[] = [
    "Real-time AI behavioral analysis",
    "Industry-specific question banks",
    "Detailed performance reports",
];

const LeftPanel: React.FC = () => {
    return (
        <div
            style={{
                flex: "1 1 50%",
                minWidth: 0,
                display: "flex",
                position: "relative",
                minHeight: "100vh",
                backgroundImage: "url('/hero.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            
            }}
        >
            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "3rem",
                    color: "white",
                    maxWidth: "34rem",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                {/* Brand */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <div
                        style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            background: "white",
                            borderRadius: "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: PRIMARY,
                            flexShrink: 0,
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.75rem" }}
                        >
                            psychology
                        </span>
                    </div>
                    <h1 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
                        Interview Pro AI With SkillForge.
                    </h1>
                </div>

                <h2
                    style={{
                        fontWeight: 900,
                        lineHeight: 1.2,
                        marginBottom: "1.5rem",
                        fontSize: "2.5rem",
                    }}
                >
                    Master your next big career move.
                </h2>

                <p
                    style={{
                        fontSize: "1rem",
                        lineHeight: 1.75,
                        color: "rgba(255,255,255,0.9)",
                        marginBottom: "2.5rem",
                    }}
                >
                    Practice with our advanced AI interviewers and get real-time feedback
                    on your performance, body language, and content.
                </p>

                {/* Features */}
                {features.map((feature: string) => (
                    <div
                        key={feature}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "1.25rem",
                        }}
                    >
                        <div
                            style={{
                                width: "2rem",
                                height: "2rem",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "1rem" }}
                            >
                                check
                            </span>
                        </div>
                        <p style={{ margin: 0, fontWeight: 500 }}>{feature}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftPanel;
