import 'bootstrap/dist/css/bootstrap.min.css';

const ReadyToPractice = () => {
  return (
    <div className="bg-white rounded-3 border p-4 p-md-5" style={{ borderColor: '#e5e7eb' }}>
      <h2 className="fw-bold mb-2 text-dark">Ready to Practice?</h2>
      <p className="text-muted small mb-4">Start a new interview session</p>

      <div className="d-grid gap-3">
        {/* New Interview */}
        <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 fw-bold shadow">
          <span className="material-icons fs-5"></span>
          New Interview
        </button>

        {/* View Coaching Tips */}
        <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2 fw-bold">
          <span className="material-icons fs-5">school</span>
          View Coaching Tips
        </button>
      </div>
    </div>
  );
};

export default ReadyToPractice;