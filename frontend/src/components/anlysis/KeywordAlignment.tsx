import '../../pages/anlysis/Anlysis.css';

export default function KeywordAlignment() {
  return (
    <div className="col-12 col-lg-6">
      <div className="chart-card bg-white p-4 h-100 rounded-4 border shadow-sm">
        <h3 className="fw-bold mb-4" style={{ fontSize: '1.125rem' }}>Keyword Alignment</h3>
        
        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center p-3 mb-4">
          <span  className="px-2 py-2 " style={{ fontSize: '0.9rem',  backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Scalability</span>
          <span className='px-2 py-2 ' style={{ fontSize: '0.9rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>User Experience</span>
          <span style={{ fontSize: '0.75rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Accessibility</span>
          <span style={{ fontSize: '1.1rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Architecture</span>
          <span style={{ fontSize: '0.875rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Business Logic</span>
          <span style={{ fontSize: '0.875rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Empathy</span>
          <span style={{ fontSize: '0.75rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Agile</span>
          <span style={{ fontSize: '1.1rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>KPIs</span>
          <span style={{ fontSize: '0.875rem',backgroundColor: 'rgba(196, 196, 196, 0.6)',borderRadius: '25px' }}>Stakeholders</span>
        </div>
        
        <div className="mt-auto pt-4 border-top">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fw-medium text-dark" style={{ fontSize: '0.875rem' }}>Sentiment Distribution</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Speech Tone Analysis</span>
          </div>
          
          <div className="d-flex" style={{ height: '12px', borderRadius: '50px' }}>
            <div style={{ width: '100%', backgroundColor: 'rgba(196, 196, 196, 0.6)' }}/>
          </div>
          
          <div className="d-flex justify-content-between mt-3">
            <span className="d-flex align-items-center gap-1 text-secondary fw-medium" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#b2b4b3ff' }} /> Enthusiastic 
            </span>
            <span className="d-flex align-items-center gap-1 text-secondary fw-medium" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#d7d6d6ff' }} /> Analytical
            </span>
            <span className="d-flex align-items-center gap-1 text-secondary fw-medium" style={{ fontSize: '11px' }}>
              <span className="d-inline-block rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#c9c9c9ff' }} /> Hesitant
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
