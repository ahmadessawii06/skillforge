import '../../pages/anlysis/Anlysis.css';

export default function AnalysisFooter() {
  return (
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
  );
}
