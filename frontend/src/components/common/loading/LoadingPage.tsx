
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./LoadingPage.css";


export default function LoadingPage() {
  return (
    <main className="loading-page d-flex align-items-center justify-content-center overflow-hidden">
      <div className="loading-bg-glow glow-one" />
      <div className="loading-bg-glow glow-two" />
      <div className="scan-line" />

      <div className="loading-content text-center">
        <h1 className="loading-title">
          SkillForge
        </h1>

        <p className="loading-tagline mb-4">
          Preparing Your AI Interview Experience
        </p>

        <div className="ai-loader mx-auto">
          <div className="ai-loader-line" />
        </div>

        <p className="loading-subtitle mt-4 mb-0">
          Analyzing your career path...
        </p>
      </div>
    </main>
  );
}