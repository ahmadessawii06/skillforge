import '../../pages/anlysis/Anlysis.css';

export default function PerformanceTrend() {
  return (
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
        <div className="chart-area w-100 h-100" >
          <svg className="w-100 h-100" preserveAspectRatio="none" viewBox="0 0 400 150">
            <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="400" y1="0" y2="0" />
            <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="400" y1="50" y2="50" />
            <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="400" y1="100" y2="100" />
            <line stroke="#e2e8f0" x1="0" x2="400" y1="150" y2="150" />            <defs>
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
  );
}
