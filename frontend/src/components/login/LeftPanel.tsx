import React from "react";

const PRIMARY = "#1152d4";

const features: string[] = [
  "AI-powered mock interviews with instant personalized feedback.",
  "Real-time confidence & communication analysis.",
  "Personalized interview questions based on your CV and target job.",
 
  "Practice realistic job interviews anytime, anywhere.", ]

const LeftPanel: React.FC = () => {
  return (
    <div
      style={{
        flex: "1 1 50%",
        minWidth: 0,
        display: "flex",
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url('${import.meta.env.BASE_URL}hero2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRight: `6px solid ${PRIMARY}`,
        overflow: "hidden",
      }}
    >
      {/* هذا أهم شيء: يغمّق جهة النص فقط بدون تغيير التصميم */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,12,30,0.88) 0%, rgba(0,12,30,0.68) 38%, rgba(0,12,30,0.18) 70%, rgba(0,12,30,0.02) 100%)",
          zIndex: 1,
        }}
      />

      {/* ظل إضافي خلف النص فقط */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "18%",
          width: "55%",
          height: "64%",
          background:
            "radial-gradient(circle at left center, rgba(0,0,0,0.55), rgba(0,0,0,0.18) 55%, transparent 75%)",
          zIndex: 2,
        }}
      />

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
          minHeight: "100vh",
          textShadow: "0 3px 14px rgba(0,0,0,0.75)",
        }}
      >
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
              textShadow: "none",
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
            color: "rgba(255,255,255,0.92)",
            marginBottom: "2.5rem",
            maxWidth: "29rem",
          }}
        >
          Practice with our advanced AI interviewers and get real-time feedback
          on your performance, body language, and content.
        </p>

        {features.map((feature) => (
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
                background: "#fff",
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