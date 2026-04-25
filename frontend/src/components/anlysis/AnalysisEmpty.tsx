import { useNavigate } from 'react-router-dom';

export default function AnalysisEmpty() {
  const navigate = useNavigate();

  return (
    <div className="analysis-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="analysis-card analysis-empty text-center p-5">
              <div className="analysis-empty-icon">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h2 className="h4 fw-bold mb-3" style={{ color: 'var(--analysis-text)' }}>
                No Completed Interview Yet
              </h2>
              <p className="mb-4" style={{ color: 'var(--analysis-text-muted)', lineHeight: 1.7 }}>
                Once you finish a session, this page will break down your technical, behavioral,
                communication, and planning performance with detailed insights.
              </p>
              <button
                className="analysis-btn-primary"
                onClick={() => navigate('/ai')}
                type="button"
              >
                <span className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    play_arrow
                  </span>
                  Start Interview Practice
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
