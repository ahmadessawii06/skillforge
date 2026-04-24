import '../../pages/anlysis/Anlysis.css';

export default function SkillCards() {
  return (
    <div className="row g-4 mb-5">
      {/* Technical Skills */}
      <div className="col-12 col-md-6 col-lg-4">
        <div className="skill-card d-flex flex-column h-100 p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="skill-icon icon-blue d-inline-flex p-2">
              <span className="material-symbols-outlined">code</span>
            </div>
            <span className="skill-percentage"></span>
          </div>
          <h3 className="skill-card-title mb-2">Technical Skills</h3>
          <div className="d-flex flex-column gap-3 mb-4">
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Product Thinking</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Visual Craft</span>
                </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Systems Design</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
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
            <span className="skill-percentage"></span>
          </div>
          <h3 className="skill-card-title mb-2">Behavioral Skills</h3>
          <div className="d-flex flex-column gap-3 mb-4">
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Leadership</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Conflict Resolution</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Adaptability</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
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
            <span className="skill-percentage"></span>
          </div>
          <h3 className="skill-card-title mb-2">Communication</h3>
          <div className="d-flex flex-column gap-3 mb-4">
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Clarity &amp; Pace</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Vocabulary Choice</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span className="progress-label">Confidence Level</span>
              </div>
              <div className="progress-track w-100" style={{ height: '6px' }}>
                <div style={{ width: '100%' }} />
              </div>
            </div>
          </div>
          <div className="feedback-quote mt-auto p-3">
            <p className="mb-0">"Articulation is very clear. Watch out for filler words ('um', 'like') which spiked during the second half of the technical round."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
