import React from 'react';

interface QuestionOverviewItem {
    id: number;
    title: string;
    completed: boolean;
    current: boolean;
}

interface QuestionsOverviewProps {
    questions: QuestionOverviewItem[];
}

const QuestionsOverview: React.FC<QuestionsOverviewProps> = ({ questions }) => {
    return (
        <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4">
            <h3 className="fw-bold text-slate-800 mb-4 fs-5">Questions Overview</h3>
            <div className="d-flex flex-column gap-2">
                {questions.map((q) => (
                    <div
                        key={q.id}
                        className={`p-3 rounded-4 border ${q.completed
                                ? 'border-emerald-100 bg-emerald-50 d-flex justify-content-between align-items-start'
                                : q.current
                                    ? 'border-2 border-primary bg-blue-50 d-flex justify-content-between align-items-center'
                                    : 'border-slate-200'
                            }`}
                    >
                        <div>
                            <span className="fw-bold text-slate-800 d-block">Question {q.id}</span>
                            <span className="small text-slate-500">{q.title}</span>
                        </div>
                        {q.completed && <span className="material-symbols-outlined text-emerald-500">check_circle</span>}
                        {q.current && (
                            <span
                                className="badge bg-primary text-white px-3 py-2 rounded-3 fw-bold"
                                style={{ backgroundColor: '#1152d4' }}
                            >
                                Current
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionsOverview;