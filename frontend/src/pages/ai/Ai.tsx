import React, { useState } from 'react';
import Header from '../../components/ai/Header';
import QuestionCard from '../../components/ai/QuestionCard';
import FooterButtons from '../../components/ai/FooterButtons';
import QuestionsOverview from '../../components/ai/QuestionsOverview';
import InterviewStats from '../../components/ai/InterviewStats';

const Ai: React.FC = () => {
  // State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


  const completionZero = 0;
  const answeredZero = 0;
  const totalZero = 5;
  const questionOne = 1;
  // Static data – Question 1 is now current
  const questions = [
    { id: 1, title: 'JavaScript Fundamentals', completed: true, current: false },  // current changed to false
    { id: 2, title: 'React Performance', completed: false, current: false },
    { id: 3, title: 'Problem Solving', completed: false, current: false },
    { id: 4, title: 'Database Design', completed: false, current: false },
    { id: 5, title: 'Teamwork', completed: false, current: false },
  ];

  // Multiple choice options
  const options = [
    { id: 'a', text: 'Twitter' },
    { id: 'b', text: 'Vue' },
    { id: 'c', text: 'Facebook' },
    { id: 'd', text: 'NNU' },
  ];

  // Handlers
  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handlePrevious = () => {
    console.log('Previous question clicked');
  };

  const handleSubmit = () => {
    console.log('Interview submitted');
  };

  // Derived values
  const currentQuestionIndex = questions.findIndex((q) => q.current);
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;
  // const answeredCount = questions.filter((q) => q.completed).length;
  // const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // Timer values (static for demo)
  const timeRemaining = '0:00';
  const timerPercentage = 0; // e.g., 75% remaining

  // Current question data – changed type to FrontEnd
  const tags = ['FrontEnd', 'Easy', 'Knowledge'];  // was 'Frontend', now 'FrontEnd'
  const questionText = 'Who Created Bootstrap?';

  return (
    <div className="d-flex flex-column min-vh-100 w-100 bg-slate-50" style={{ marginTop: "100px" }}>
      <Header
        title="Interview in Progress"
        currentQuestion={currentQuestionNumber}
        totalQuestions={totalQuestions}
        timeRemaining={timeRemaining}
        timerPercentage={timerPercentage}
      />

      {/* Black Separator */}
      <div className="w-100 bg-dark" style={{ height: 4 }}></div>

      <main className="container py-5 px-3 px-md-5 flex-grow-1">
        <div className="row g-4 g-lg-5">
          {/* Left Column (2/3) */}
          <div className="col-lg-8 d-flex flex-column gap-4">
            <QuestionCard
              tags={tags}
              questionNumber={questionOne}
              questionText={questionText}
            />

            {/* Multiple Choice Card */}
            <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4 p-xl-5">
              <h3 className="fw-bold text-slate-800 mb-4">Select the Correct Answer</h3>
              <div className="d-flex flex-column gap-3">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className={`d-flex align-items-center p-4 rounded-4 border-2 cursor-pointer transition ${
                      selectedAnswer === option.id
                        ? 'border-primary bg-blue-50'
                        : 'border-slate-200 bg-white hover-border'
                    }`}
                    style={{
                      cursor: 'pointer',
                      borderColor: selectedAnswer === option.id ? '#1152d4' : '#e2e8f0',
                      backgroundColor: selectedAnswer === option.id ? 'rgba(17, 82, 212, 0.05)' : 'white',
                    }}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.id}
                      checked={selectedAnswer === option.id}
                      onChange={() => handleOptionSelect(option.id)}
                      style={{ marginRight: '1rem', cursor: 'pointer' }}
                    />
                    <span className="text-slate-700 fw-500">{option.text}</span>
                  </label>
                ))}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-4 p-3 d-flex gap-3 align-items-start mt-4">
                <i className="fa-regular fa-lightbulb text-blue-600 fs-4"></i>
                <div>
                  <span className="text-blue-900 fw-bold d-block small">Hint:</span>
                  <p className="text-blue-800 small mb-0">
                    Bootstrap is a popular CSS framework for responsive design
                  </p>
                </div>
              </div>
            </div>

            <FooterButtons onPrevious={handlePrevious} onSubmit={handleSubmit} />
          </div>

          {/* Right Column (1/3) */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <QuestionsOverview questions={questions} />
            {/* <InterviewStats
              completionPercentage={completionPercentage}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
            /> */}
  

             <InterviewStats
              completionPercentage={completionZero}
              answeredCount={answeredZero}
              totalQuestions={totalZero}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ai;