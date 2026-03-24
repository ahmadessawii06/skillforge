import './anlysis.css';

export default function Anlysis() {
  return (
    <div className="anlysis-page">
      <div className="container-fluid px-3 px-md-5 py-4">

        {/* ===== Header Section ===== */}
        <div className="row align-items-center mb-5">
          <div className="col-12 col-md-7 mb-3 mb-md-0">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="session-badge d-inline-block px-2 py-0">Session ID: #</span>
              <span className="session-date">•</span>
            </div>
            <h1 className="anlysis-title">
              Senior Product Designer <span className="text-highlight">Analysis</span>
            </h1>
            <p className="anlysis-subtitle mt-2">
              Comprehensive performance breakdown for the Meta mock interview session.
            </p>
          </div>
          <div className="col-12 col-md-5">
            <div className="score-box d-flex align-items-center gap-4 p-3">
              <div className="score-circle-wrapper" style={{ width: '96px', height: '96px' }}>
                <svg className="w-100 h-100" viewBox="0 0 100 100">
                  <circle className="circle-bg" cx="50" cy="50" r="40" strokeWidth="8" />
                  <circle className="circle-fg" cx="50" cy="50" r="40" strokeWidth="8"
                    strokeDasharray="251.2" strokeDashoffset="251.2" />
                </svg>
                <div className="score-value-overlay d-flex flex-column align-items-center justify-content-center">
                  <span className="score-num">0</span>
                  <span className="score-label">Score</span>
                </div>
              </div>
              <div className="d-flex flex-column">
                <span className="rating-text">Overall Rating</span>
                <span className="rating-result">--</span>
                <span className="rating-change d-flex align-items-center gap-1 mt-1">
                  <span className="material-symbols-outlined">trending_up</span>
                  +0% from last session
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 3 Skill Cards ===== */}
        <div className="row g-4 mb-5">
          {/* Technical Skills */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="skill-card d-flex flex-column h-100 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="skill-icon icon-blue d-inline-flex p-2">
                  <span className="material-symbols-outlined">code</span>
                </div>
                <span className="skill-percentage">0%</span>
              </div>
              <h3 className="skill-card-title mb-2">Technical Skills</h3>
              <div className="d-flex flex-column gap-3 mb-4">
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Product Thinking</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-green h-100" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Visual Craft</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-green h-100" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Systems Design</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-yellow h-100" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
              <div className="feedback-quote mt-auto p-3">
                <p className="mb-0">"Demonstrated exceptional depth in product strategy and user-centric problem solving. Minor room for improvement in scalability edge cases."</p>
              </div>
            </div>
          </div>

          {/* Behavioral Skills */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="skill-card d-flex flex-column h-100 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="skill-icon icon-purple d-inline-flex p-2">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <span className="skill-percentage">0%</span>
              </div>
              <h3 className="skill-card-title mb-2">Behavioral Skills</h3>
              <div className="d-flex flex-column gap-3 mb-4">
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Leadership</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-yellow h-100" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Conflict Resolution</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-red h-100" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Adaptability</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-green h-100" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
              <div className="feedback-quote mt-auto p-3">
                <p className="mb-0">"Good energy, but struggled to provide a concrete 'STAR' method response for the conflict question. Needs more structured anecdotes."</p>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="skill-card d-flex flex-column h-100 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="skill-icon icon-orange d-inline-flex p-2">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <span className="skill-percentage">0%</span>
              </div>
              <h3 className="skill-card-title mb-2">Communication</h3>
              <div className="d-flex flex-column gap-3 mb-4">
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Clarity &amp; Pace</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-green h-100" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Vocabulary Choice</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-yellow h-100" style={{ width: '0%' }} />
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="progress-label">Confidence Level</span>
                    <span className="progress-val">0%</span>
                  </div>
                  <div className="progress-track w-100" style={{ height: '6px' }}>
                    <div className="progress-fill fill-green h-100" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
              <div className="feedback-quote mt-auto p-3">
                <p className="mb-0">"Articulation is very clear. Watch out for filler words ('um', 'like') which spiked during the second half of the technical round."</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Trend Chart + Keywords ===== */}
        <div className="row g-4 mb-5">
          {/* Performance Trend */}
          <div className="col-12 col-lg-6">
            <div className="chart-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="skill-card-title mb-0">Performance Trend</h3>
                <div className="d-flex gap-3">
                  <span className="d-flex align-items-center gap-1">
                    <span className="legend-dot dot-primary d-inline-block" style={{ width: '8px', height: '8px' }} />
                    <span className="legend-text">Technical</span>
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <span className="legend-dot dot-gray d-inline-block" style={{ width: '8px', height: '8px' }} />
                    <span className="legend-text">Avg. Candidate</span>
                  </span>
                </div>
              </div>
              <div className="chart-area w-100" style={{ height: '256px' }}>
                <svg className="w-100 h-100" preserveAspectRatio="none" viewBox="0 0 400 150">
                  <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="400" y1="0" y2="0" />
                  <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="400" y1="50" y2="50" />
                  <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="400" y1="100" y2="100" />
                  <line stroke="#e2e8f0" x1="0" x2="400" y1="150" y2="150" />
                  <path d="M0 90 L80 85 L160 88 L240 82 L320 85 L400 80" fill="none"
                    stroke="#cbd5e1" strokeDasharray="4" strokeWidth="2" />
                  <path d="M0 130 L80 110 L160 115 L240 60 L320 45 L400 30" fill="none"
                    stroke="#1152d4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M0 130 L80 110 L160 115 L240 60 L320 45 L400 30 V150 H0 Z"
                    fill="url(#lineGradient)" opacity="0.1" />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#1152d4" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1152d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="d-flex justify-content-between mt-2 chart-dates">
                <span>Sep 10</span>
                <span>Sep 25</span>
                <span>Oct 05</span>
                <span>Oct 15</span>
                <span>Oct 24</span>
              </div>
            </div>
          </div>

          {/* Keyword Alignment */}
          <div className="col-12 col-lg-6">
            <div className="chart-card p-4 h-100">
              <h3 className="skill-card-title mb-4">Keyword Alignment</h3>
              <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center p-3">
                <span className="kw-tag kw-gray px-2 py-1">Scalability</span>
                <span className="kw-tag kw-gray px-2 py-1">User Experience</span>
                <span className="kw-tag kw-gray px-2 py-1">Accessibility</span>
                <span className="kw-tag kw-gray px-2 py-1">Architecture</span>
                <span className="kw-tag kw-gray px-2 py-1">Business Logic</span>
                <span className="kw-tag kw-gray px-2 py-1">Empathy</span>
                <span className="kw-tag kw-gray px-2 py-1">Agile</span>
                <span className="kw-tag kw-gray px-2 py-1">KPIs</span>
                <span className="kw-tag kw-gray px-2 py-1">Stakeholders</span>
              </div>
              <div className="mt-4 pt-4 border-top">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-medium" style={{ fontSize: '0.875rem' }}>Sentiment Distribution</span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Speech Tone Analysis</span>
                </div>
                <div className="sentiment-bar d-flex w-100" style={{ height: '12px' }}>
                  <div className="sentiment-seg seg-green" style={{ width: '0%' }} title="Positive" />
                  <div className="sentiment-seg seg-yellow" style={{ width: '0%' }} title="Neutral" />
                  <div className="sentiment-seg seg-red" style={{ width: '0%' }} title="Anxious" />
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="sentiment-label d-flex align-items-center gap-1">
                    <span className="sentiment-dot sd-green d-inline-block" style={{ width: '6px', height: '6px' }} /> Enthusiastic (0%)
                  </span>
                  <span className="sentiment-label d-flex align-items-center gap-1">
                    <span className="sentiment-dot sd-yellow d-inline-block" style={{ width: '6px', height: '6px' }} /> Analytical (0%)
                  </span>
                  <span className="sentiment-label d-flex align-items-center gap-1">
                    <span className="sentiment-dot sd-red d-inline-block" style={{ width: '6px', height: '6px' }} /> Hesitant (0%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Footer Actions ===== */}
        <div className="row anlysis-footer py-4">
          <div className="col-12 col-md-8 d-flex flex-column flex-sm-row gap-2 mb-3 mb-md-0">
            <button className="btn-anlysis-primary d-inline-flex align-items-center gap-2 px-4 py-2">
              <span className="material-symbols-outlined">download</span>
              Download PDF Report
            </button>
            <button className="btn-anlysis-outline d-inline-flex align-items-center gap-2 px-4 py-2">
              <span className="material-symbols-outlined">share</span>
              Share Results
            </button>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-md-end">
            <a className="retake-link d-flex align-items-center gap-1" href="#">
              Retake Interview Practice
              <span className="material-symbols-outlined">chevron_right</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}