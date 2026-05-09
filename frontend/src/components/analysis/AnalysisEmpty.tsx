import { useNavigate } from "react-router-dom";

export default function AnalysisEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-center py-8">
      <i className="fas fa-chart-line text-5xl text-[#7C3AED] mb-4"></i>

      <h2 className="text-2xl font-bold text-white mb-4">
        No Completed Interview Yet
      </h2>

      <p className="text-[#A1A1AA] mb-6 max-w-md">
        Once you finish a session, this page will break down your technical,
        behavioral, communication, and planning performance with detailed insights.
      </p>

      <button
        className="bg-[#7C3AED] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6D28D9] transition-colors"
        onClick={() => navigate("/interview")}
        type="button"
      >
        Start Interview Practice
      </button>
    </div>
  );
}
