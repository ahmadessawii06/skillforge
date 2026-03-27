import React from 'react';

interface TimerProps {
    timeRemaining: string;   // e.g., "2:26"
    percentage: number;      // 0..100, determines the stroke-dashoffset
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, percentage }) => {
    const offset = 100 - percentage; // because strokeDasharray="100"
    return (
        <div className="d-flex align-items-center gap-3 bg-slate-50 px-4 py-2 rounded-4 border border-slate-200 shadow-sm">
            <div
                className="position-relative d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40 }}
            >
                <svg className="w-100 h-100" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    <circle
                        cx="18"
                        cy="18" 
                        r="16"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeDasharray="100"
                        strokeDashoffset={offset}
                    />
                </svg>
                <span
                    className="material-symbols-outlined position-absolute text-emerald-600"
                    style={{ fontSize: '1.25rem' }}
                >
                    schedule
                </span>
            </div>
            <div className="d-flex flex-column lh-1">
                <span className="small text-uppercase fw-bold text-slate-400">Time Remaining</span>
                <span className="text-emerald-600 font-monospace fw-bold fs-5">{timeRemaining}</span>
            </div>
        </div>
    );
};

export default Timer;