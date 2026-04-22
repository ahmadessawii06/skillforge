import '../../pages/anlysis/Anlysis.css';

export default function AnalysisFooter() {
  return (
    <div className="row anlysis-footer py-4">
      <div className="col-12  d-flex align-items-center justify-content-md-end">
        <a className="retake-link d-flex align-items-center gap-1" href="#">
          Retake Interview Practice
          <span className="material-symbols-outlined">chevron_right</span>
        </a>
      </div>
    </div>
  );
}
