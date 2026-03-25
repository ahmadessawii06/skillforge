type ProfileNavigationProps = {
    onNext?: () => void;
    onBack?: () => void;
};

const ProfileNavigation = ({ onNext, onBack }: ProfileNavigationProps) => {
    return (
        <div className="d-flex justify-content-between align-items-center py-3">
            <button
                type="button"
                className="btn btn-link text-decoration-none text-dark fw-semibold ps-0"
                onClick={onBack}
            >
                Skip for now
            </button>

            <button
                type="button"
                className="btn btn-secondary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                onClick={onNext}
            >
                Save and Continue
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default ProfileNavigation;