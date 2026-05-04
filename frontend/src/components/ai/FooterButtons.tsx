import React from 'react';

interface FooterButtonsProps {
  onPrevious: () => void;
  onNextOrSubmit: () => void;
  isNext: boolean;
  isAnswerEvaluated: boolean;
  hasSelection: boolean;
  canGoPrevious?: boolean;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({
  onPrevious,
  onNextOrSubmit,
  isNext,
  isAnswerEvaluated,
  hasSelection,
  canGoPrevious = false
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-2">
      <button
        onClick={onPrevious}
        className="btn btn-light border border-slate-200 rounded-4 px-4 py-3 fw-bold text-slate-700 shadow-sm"
        disabled={!canGoPrevious}
        style={{ opacity: canGoPrevious ? 1 : 0.5, cursor: canGoPrevious ? 'pointer' : 'not-allowed' }}
      >
        Previous Question
      </button>
      <button
        onClick={onNextOrSubmit}
        className="btn bg-emerald-600 text-white border-0 rounded-4 px-5 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg"
        style={{
          backgroundColor: isAnswerEvaluated || hasSelection ? '#059669' : '#9ca3af',
          cursor: isAnswerEvaluated || hasSelection ? 'pointer' : 'not-allowed'
        }}
        disabled={!isAnswerEvaluated && !hasSelection}
      >
        <span className="material-symbols-outlined fs-6">
          {isNext ? (isAnswerEvaluated ? 'arrow_forward' : 'check_circle') : 'check_circle'}
        </span>
        {isAnswerEvaluated ? (isNext ? 'Next Question' : 'Submit Interview') : 'Submit Answer'}
      </button>
    </div>
  );
};

export default FooterButtons;
