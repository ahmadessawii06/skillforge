import { useNavigate } from "react-router-dom";

const NoCv = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center py-5">
            <h2 className="fw-bold mb-3">No CV Found</h2>
            <p className="text-muted mb-4">
                You need to upload your CV first to start an AI interview.
            </p>

            <button
                className="btn btn-primary px-4 py-2"
                onClick={() => navigate("/cv")}
            >
                Upload CV
            </button>
        </div>
    );
};

export default NoCv;