const ProfileInfoNotice = () => {
    return (
        <div className="d-flex align-items-start gap-2 p-3 rounded-3 bg-light mt-2">
            <span
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold"
                style={{ width: "20px", height: "20px", fontSize: "11px", marginTop: "2px" }}
            >
                i
            </span>
            <p className="mb-0 text-muted small lh-base">
                Your CV helps our AI generate personalized interview questions based on your actual experience.
                We don't share your data with third parties.
            </p>
        </div>
    );
};

export default ProfileInfoNotice;