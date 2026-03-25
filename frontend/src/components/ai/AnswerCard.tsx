import React from 'react';

interface AnswerCardProps {
    answer: string;
    wordCount: number;
    onAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, wordCount, onAnswerChange }) => {
    return (
        <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4 p-xl-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold text-slate-800 mb-0">Your Answer</h3>
                <span className="small text-slate-400 fw-medium">{wordCount} words</span>
            </div>
            <textarea
                className="form-control bg-slate-50 border-0 p-4 rounded-4 mb-4"
                rows={6}
                placeholder="Type your answer here... Be specific and provide examples where possible."
                style={{ resize: 'none', backgroundColor: '#f8fafc' }}
                value={answer}
                onChange={onAnswerChange}
            />
            <div className="bg-blue-50 border border-blue-200 rounded-4 p-3 d-flex gap-3 align-items-start">
                <span className="material-symbols-outlined text-blue-600 fs-4">lightbulb</span>
                <div>
                    <span className="text-blue-900 fw-bold d-block small">Tip:</span>
                    <p className="text-blue-800 small mb-0">Use the STAR method – Situation, Task, Action, Result</p>
                </div>
            </div>
        </div>
    );
};

export default AnswerCard;