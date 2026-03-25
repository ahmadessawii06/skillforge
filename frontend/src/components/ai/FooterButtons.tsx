import React from 'react';

interface FooterButtonsProps {
    onPrevious: () => void;
    onSubmit: () => void;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ onPrevious, onSubmit }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mt-2">
            <button
                onClick={onPrevious}
                className="btn btn-light border border-slate-200 rounded-4 px-4 py-3 fw-bold text-slate-700 shadow-sm"
            >
                Previous Question
            </button>
            <button
                onClick={onSubmit}
                className="btn bg-emerald-600 text-white border-0 rounded-4 px-5 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg"
                style={{ backgroundColor: '#059669' }}
            >
                <span className="material-symbols-outlined fs-6">check_circle</span>
                Submit Interview
            </button>
        </div>
    );
};

export default FooterButtons;