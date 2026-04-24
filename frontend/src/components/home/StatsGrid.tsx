import 'bootstrap/dist/css/bootstrap.min.css';
import { ArrowRight } from 'lucide-react';

const StatsGrid = () => {
  return (
    <div className="row g-3">

      {/* Overall Score */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border" style={{ borderColor: '#e5e7eb' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="small text-secondary mb-0">Overall Score</p>
              <span className="badge bg-light text-muted small fw-bold">—</span>
            </div>

            <div className="d-flex align-items-end gap-2">
              <h3 className="fw-bold mb-0 text-dark">
                0
                <span className="text-muted fs-6 fw-normal">/100</span>
              </h3>
            </div>

            <div className="progress mt-3" style={{ height: '10px', borderRadius: '8px', backgroundColor: '#f1f5f9' }}>
              <div
                className="progress-bar"
                style={{ width: '0%', backgroundColor: '#1e6de0' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Interviews Completed */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border" style={{ borderColor: '#e5e7eb' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="small text-secondary mb-0">Interviews Completed</p>
              <span className="badge bg-light text-muted small fw-bold">—</span>
            </div>

            <h3 className="fw-bold text-dark mb-1">0</h3>
            <p className="small text-muted mb-0">Start your first interview</p>
          </div>
        </div>
      </div>

      {/* Success Rate */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border" style={{ borderColor: '#e5e7eb' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="small text-secondary mb-0">Success Rate</p>
              <span className="badge bg-light text-muted small fw-bold">—</span>
            </div>

            <h3 className="fw-bold text-dark mb-3">0%</h3>

            <div className="d-flex gap-1" style={{ height: '10px' }}>
              <div className="flex-fill bg-light rounded"></div>
              <div className="flex-fill bg-light rounded"></div>
              <div className="flex-fill bg-light rounded"></div>
              <div className="flex-fill bg-light rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Area of Improvement */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card h-100 border d-flex flex-column justify-content-between" style={{ borderColor: '#e5e7eb' }}>
          <div className="card-body">
            <p className="small text-secondary mb-1">Area of Improvement</p>
            <h3 className="fw-bold text-muted mb-0">—</h3>
          </div>

          
        </div>
      </div>

    </div>
  );
};

export default StatsGrid;