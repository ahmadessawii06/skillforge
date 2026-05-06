import { useNavigate } from "react-router-dom";

export default function AnalysisEmpty() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center py-5">
      <i className="fas fa-chart-line fa-3x text-danger mb-3"></i>

      <h2 className="fw-bold mb-3">No Completed Interview Yet</h2>

      <p className="text-muted mb-4">
        Once you finish a session, this page will break down your technical,
        behavioral, communication, and planning performance with detailed insights.
      </p>

      <button
        className="btn btn-primary px-4 py-2 fw-bold"
        onClick={() => navigate("/interview")}
        type="button"
      >
         Start Interview Practice
      </button>
    </div>
  );
}