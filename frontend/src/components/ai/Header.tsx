import React from 'react';
import Timer from './Timer';

interface HeaderProps {
    title: string;
    currentQuestion: number;
    totalQuestions: number;
    timeRemaining: string;
    timerPercentage: number;
}

const Header: React.FC<HeaderProps> = ({
    title,
    currentQuestion,
    totalQuestions,
    timeRemaining,
    timerPercentage,
}) => {
    return (
        <header className="bg-white py-3 px-4 px-md-5 d-flex justify-content-between align-items-center border-bottom border-slate-200">
            <div className="d-flex flex-column">
                <h1 className="h5 fw-bold text-slate-800 mb-0">{title}</h1>
                <span className="small text-slate-500 mt-1">
                    Question {currentQuestion} of {totalQuestions}
                </span>
            </div>
            <div className="d-flex align-items-center gap-4">
                <Timer timeRemaining={timeRemaining} percentage={timerPercentage} />
            </div>
        </header>
    );
};

export default Header;