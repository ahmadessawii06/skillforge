import 'bootstrap/dist/css/bootstrap.min.css';

const HeroSection = () => {
  return (
    <section className="position-relative rounded-4 p-4 p-md-5 border bg-white text-dark overflow-hidden" style={{ borderColor: '#e5e7eb' }}>
      
      {/* Content */}
      <div className="position-relative z-index-1" style={{ maxWidth: '40rem' }}>
        <h1 className="fw-bold display-6 mb-3">
          Welcome back, Alex. Ready to practice?
        </h1>
        <p className="text-muted fs-5 mb-4">
          Sharpen your skills with our AI-powered mock interviews and get real-time feedback on your technical and behavioral performance.
        </p>

        <div className="d-flex flex-wrap gap-2 gap-md-3">
          {/* Start New Interview */}
          <button className="btn btn-primary d-flex align-items-center gap-2 fw-bold">
            <span className="material-icons fs-4">play_circle</span>
            Start New Interview
          </button>

          {/* View Learning Path */}
          <button className="btn btn-outline-secondary text-dark d-flex align-items-center gap-2 fw-bold">
            View Learning Path
          </button>
        </div>
      </div>

      {/* Background SVG */}
      <div className="position-absolute top-0 end-0" style={{ width: '33%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
        <svg className="w-100 h-100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.5,81.4,29,73.1,42.1C64.8,55.1,53.8,66.8,40.5,74.1C27.2,81.3,13.6,84.1,-0.5,85C-14.6,85.9,-29.2,84.8,-42.8,78.2C-56.4,71.6,-69,59.4,-77.4,45.3C-85.9,31.2,-90.1,15.6,-89.4,0.4C-88.7,-14.8,-83.1,-29.6,-74.3,-43.1C-65.4,-56.6,-53.4,-68.8,-39.7,-76.3C-26,-83.8,-13,-86.6,0.3,-87.1C13.6,-87.6,27.2,-85.8,44.7,-76.4Z" fill="#1152d4" transform="translate(100 100)"/>
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;