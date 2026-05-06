import React from 'react';

interface QuestionOverviewItem {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
  isCorrect?: boolean;
}

interface QuestionsOverviewProps {
  questions: QuestionOverviewItem[];
}

const QuestionsOverview: React.FC<QuestionsOverviewProps> = ({ questions }) => {
  return (
    <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4">
      <h3 className="fw-bold text-slate-800 mb-4 fs-5">Questions Overview</h3>
      <div className="d-flex flex-column gap-2">
        {questions.map((q, index) => {
          const questionNumber = index + 1;
          return (
            <div
              key={q.id}
              className={`p-3 rounded-4 border transition-all ${q.completed
                  ? q.isCorrect
                    ? 'border-success bg-success-light d-flex justify-content-between align-items-start'
                    : 'border-danger bg-danger-light d-flex justify-content-between align-items-start'
                  : q.current
                    ? 'border-2 border-primary bg-blue-50 d-flex justify-content-between align-items-center'
                    : 'border-slate-200 bg-white'
                }`}
              style={{
                transition: 'all 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center gap-2">
                {q.completed && (
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: q.isCorrect ? '#059669' : '#dc2626' }}>
                    {q.isCorrect ? 'check_circle' : 'error'}
                  </span>
                )}
                <div>
                  <span className="fw-bold text-slate-800 d-block">Question {questionNumber}</span>
                  <span className="small text-slate-500">{q.title}</span>
                </div>
              </div>
              {q.current && (
                <span
                  className="badge px-3 py-2 rounded-3 fw-bold"
                  style={{ backgroundColor: '#1152d4', color: 'white' }}
                >
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-top">
        <div className="d-flex flex-column gap-2 small">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-success" style={{ fontSize: '16px' }}>check_circle</span>
            <span className="text-slate-600">Correct</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined text-danger" style={{ fontSize: '16px' }}>error</span>
            <span className="text-slate-600">Incorrect</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1152d4' }} />
            <span className="text-slate-600">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsOverview;
