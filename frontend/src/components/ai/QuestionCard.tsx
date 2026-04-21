import React from 'react';

interface QuestionCardProps {
    tags: string[];
    questionNumber: number;
    questionText: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ tags, questionNumber, questionText }) => {
    return (
        <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4 p-xl-5">
            <div className="d-flex gap-2 mb-4 flex-wrap">
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="badge bg-slate-100 text-slate-600 fw-bold px-3 py-2 rounded-pill"
                        style={{ background: 'green' }} // kept as in original, but you may want to remove inline style
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <h2 className="h5 fw-bold text-slate-800 mb-4">Question {questionNumber}</h2>
            <p className="text-slate-700 fs-5 lh-base">{questionText}</p>
        </div>
    );
};

export default QuestionCard;