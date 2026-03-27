import '../../pages/anlysis/Anlysis.css';

export default function KeywordAlignment() {
  return (
    <div className="col-12 col-lg-6">
      <div className="chart-card bg-white p-4 h-100 rounded-4 border shadow-sm">
        <h3 className="fw-bold mb-4" style={{ fontSize: '1.125rem' }}>Keyword Alignment</h3>
        
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center p-3 mb-4">
          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fs-6">Scalability</span>
          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2" style={{ fontSize: '0.9rem' }}>User Experience</span>
          <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-2 py-1" style={{ fontSize: '0.75rem' }}>Accessibility</span>
          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-4 py-2 fw-black" style={{ fontSize: '1.1rem' }}>Architecture</span>
          <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 border border-danger border-opacity-25" style={{ fontSize: '0.875rem' }}>Business Logic</span>
          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fs-6">Empathy</span>
          <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-2 py-1" style={{ fontSize: '0.75rem' }}>Agile</span>
          <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 border border-danger border-opacity-25 fs-5">KPIs</span>
          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2" style={{ fontSize: '0.875rem' }}>Stakeholders</span>
        </div>
        
        <div className="mt-auto pt-4 border-top">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fw-medium text-dark" style={{ fontSize: '0.875rem' }}>Sentiment Distribution</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Speech Tone Analysis</span>
          </div>
          
          <div className="d-flex w-100" style={{ height: '12px', borderRadius: '50px', overflow: 'hidden' }}>
            <div style={{ width: '70%', backgroundColor: '#22c55e' }} title="Positive" />
            <div style={{ width: '20%', backgroundColor: '#facc15' }} title="Neutral" />
            <div style={{ width: '10%', backgroundColor: '#ef4444' }} title="Anxious" />
          </div>
          
          <div className="d-flex justify-content-between mt-3">
            <span className="d-flex align-items-center gap-1 text-secondary fw-medium" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#22c55e' }} /> Enthusiastic (70%)
            </span>
            <span className="d-flex align-items-center gap-1 text-secondary fw-medium" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#facc15' }} /> Analytical (20%)
            </span>
            <span className="d-flex align-items-center gap-1 text-secondary fw-medium" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#ef4444' }} /> Hesitant (10%)
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
