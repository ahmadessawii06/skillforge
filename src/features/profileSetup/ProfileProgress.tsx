type ProfileProgressProps = {
    step: number;
};

const STEPS = ["Upload CV", "Job Target", "Preferences"];

const ProfileProgress = ({ step }: ProfileProgressProps) => {
    const percent = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

    return (
        <div className="mb-4">
            {/* Step label */}
            <p className="text-primary fw-bold mb-1" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                STEP {step} OF {STEPS.length}
            </p>

            {/* Title + percent */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="fw-bold mb-0 fs-3">
                    Create your profile
                </h1>
                <span className="text-muted small">{percent}% Complete</span>
            </div>

            {/* Progress bar */}
            <div className="progress mb-2" style={{ height: "6px" }}>
                <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${percent}%` }}
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>

            {/* Step labels */}
            <div className="d-flex justify-content-between">
                {STEPS.map((label, i) => (
                    <span
                        key={label}
                        className={`fw-semibold small ${i + 1 < step ? "text-primary" : i + 1 === step ? "text-primary fw-bold" : "text-muted"}`}
                        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
                    >
                        {i + 1}. {label.toUpperCase()}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProfileProgress;