import React from 'react';

interface InterviewStatsProps {
    completionPercentage: number;
    answeredCount: number;
    totalQuestions: number;
}

const InterviewStats: React.FC<InterviewStatsProps> = ({
    completionPercentage,
    answeredCount,
    totalQuestions,
}) => {
    const remainingCount = totalQuestions - answeredCount;
    return (
        <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4">
            <h3 className="fw-bold text-slate-800 mb-4 fs-5">Interview Stats</h3>
            <div className="d-flex flex-column gap-4">
                <div>
                    <div className="d-flex justify-content-between align-items-center small fw-bold mb-2">
                        <span className="text-slate-500 text-uppercase">Completion</span>
                        <span className="text-slate-800">{completionPercentage}%</span>
                    </div>
                    <div className="progress" style={{ height: 8 }}>
                        <div
                            className="progress-bar bg-dark"
                            style={{ width: `${completionPercentage}%` }}
                            role="progressbar"
                            aria-valuenow={completionPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                </div>
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center border-bottom border-slate-100 pb-2">
                        <span className="small fw-bold text-slate-400 text-uppercase">Answered</span>
                        <span className="font-monospace fw-bold text-slate-700">
                            {answeredCount} / {totalQuestions}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="small fw-bold text-slate-400 text-uppercase">Remaining</span>
                        <span className="font-monospace fw-bold text-slate-700">{remainingCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewStats;