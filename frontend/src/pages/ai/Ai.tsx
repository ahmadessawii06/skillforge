
// export default function Ai() {
//   return (

//     <>
//       {/* Ai-Header */}
//       <section className="bg-light d-flex justify-content-between p-3 border-bottom border-dark border-5 border-top border-dark border-dark">
//         <div className="d-flex flex-column align-items-start rounded mx-3 ">
//           <h1 className="fs-5 fw-bold">Interview in Progress</h1>
//           <h2 className="fs-6 text-muted">Questions 5 of 5</h2>
//         </div>
//         <div className="d-flex flex-column align-items-end rounded text-end mx-3 ">
//           <h1 className="fs-5 fw-bold text-muted">TIME REMAINING</h1>
//           <h2 className="fs-4 text-success me-3">
//             {" "}
//             05:00 <span className="text-dark">/</span>{" "}
//             <span className=" text-danger">02:26</span>{" "}
//           </h2>
//         </div>
//       </section>

//       {/* Ai-Q */}
//       <div className="bg-white rounded-5 shadow-sm border p-4 p-xl-5 m-3">
//         <div className="d-flex gap-2 mb-4 flex-wrap">
//           <span className="badge bg-secondary">Teamwork</span>
//           <span className="badge bg-success">Easy</span>
//           <span className="badge bg-secondary">Behavioral</span>
//         </div>

//         <h2 className="h5 fw-bold mb-4">Question 5</h2>

//         <p className="fs-5">
//           Describe a situation where you had to work with a difficult team member.
//           How did you handle it?
//         </p>
//       </div>


//       {/* Ai-Answer */}
//       <section className=" bg-white w-220 h-100 rounded-5 shadow-sm border p-4 p-xl-5 m-3 ">
//         <h4 className="mb-4">Your Answer</h4>
//         <textarea
//           className="w-100 form-control "
//           placeholder="Type your answer here... Be Specific and provide examples where possible. "
//           style={{ height: "200px" }}
//         />
//         <div className="bg-danger bg-opacity-10 mt-3 rounded-3 shadow-sm border p-xl-5 ">
//           <h5 className="mx-3 my-3 fw-bold">NOTES:</h5>
//           <ul>
//             <li>
//               {" "}
//               <p>Use the STAR method - Situation, Task, Action, Result. </p>
//             </li>
//             <li>
//               {" "}
//               <p>Don't Use AI :).</p>
//             </li>
//           </ul>
//         </div>
//       </section>
//     </>
//   )
// }



// import React, { useState } from 'react';

// const Ai: React.FC = () => {
//   // State for answer text and word count
//   const [answer, setAnswer] = useState<string>('');
//   const wordCount = answer.trim() === '' ? 0 : answer.trim().split(/\s+/).length;

//   // Static data for questions overview
//   const questions = [
//     { id: 1, title: 'JavaScript Fundamentals', completed: true, current: false },
//     { id: 2, title: 'React Performance', completed: false, current: false },
//     { id: 3, title: 'Problem Solving', completed: false, current: false },
//     { id: 4, title: 'Database Design', completed: false, current: false },
//     { id: 5, title: 'Teamwork', completed: false, current: true },
//   ];

//   // Handlers
//   const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setAnswer(e.target.value);
//   };

//   const handlePrevious = () => {
//     console.log('Previous question clicked');
//   };

//   const handleSubmit = () => {
//     console.log('Interview submitted');
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 w-100 bg-slate-50">
//       {/* Header */}
//       <header className="bg-white py-3 px-4 px-md-5 d-flex justify-content-between align-items-center border-bottom border-slate-200">
//         <div className="d-flex flex-column">
//           <h1 className="h5 fw-bold text-slate-800 mb-0">Interview in Progress</h1>
//           <span className="small text-slate-500 mt-1">Question 5 of 5</span>
//         </div>
//         <div className="d-flex align-items-center gap-4">
//           {/* Timer Card */}
//           <div className="d-flex align-items-center gap-3 bg-slate-50 px-4 py-2 rounded-4 border border-slate-200 shadow-sm">
//             <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
//               <svg className="w-100 h-100" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
//                 <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2" />
//                 <circle
//                   cx="18"
//                   cy="18"
//                   r="16"
//                   fill="none"
//                   stroke="#059669"
//                   strokeWidth="2"
//                   strokeDasharray="100"
//                   strokeDashoffset="25"
//                 />
//               </svg>
//               <span className="material-symbols-outlined position-absolute text-emerald-600" style={{ fontSize: '1.25rem' }}>
//                 schedule
//               </span>
//             </div>
//             <div className="d-flex flex-column lh-1">
//               <span className="small text-uppercase fw-bold text-slate-400">Time Remaining</span>
//               <span className="text-emerald-600 font-monospace fw-bold fs-5">2:26</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Black Separator */}
//       <div className="w-100 bg-dark" style={{ height: 4 }}></div>

//       {/* Main Content */}
//       <main className="container py-5 px-3 px-md-5 flex-grow-1">
//         <div className="row g-4 g-lg-5">
//           {/* Left Column (2/3 width on large) */}
//           <div className="col-lg-8 d-flex flex-column gap-4">
//             {/* Question Card */}
//             <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4 p-xl-5">
//               <div className="d-flex gap-2 mb-4 flex-wrap">
//                 <span className="badge bg-slate-100 text-slate-600 fw-bold px-3 py-2 rounded-pill" style={{ background: "red" }}>Teamwork</span>
//                 <span className="badge bg-emerald-50 text-emerald-600 fw-bold px-3 py-2 rounded-pill" style={{ background: "red" }}>Easy</span>
//                 <span className="badge bg-slate-100 text-slate-600 fw-bold px-3 py-2 rounded-pill" style={{ background: "red" }}>Behavioral</span>
//               </div>
//               <h2 className="h5 fw-bold text-slate-800 mb-4">Question 5</h2>
//               <p className="text-slate-700 fs-5 lh-base">
//                 Describe a situation where you had to work with a difficult team member. How did you handle it?
//               </p>
//             </div>

//             {/* Answer Card */}
//             <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4 p-xl-5">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h3 className="fw-bold text-slate-800 mb-0">Your Answer</h3>
//                 <span className="small text-slate-400 fw-medium">{wordCount} words</span>
//               </div>
//               <textarea
//                 className="form-control bg-slate-50 border-0 p-4 rounded-4 mb-4"
//                 rows={6}
//                 placeholder="Type your answer here... Be specific and provide examples where possible."
//                 style={{ resize: 'none', backgroundColor: '#f8fafc' }}
//                 value={answer}
//                 onChange={handleAnswerChange}
//               />
//               <div className="bg-blue-50 border border-blue-200 rounded-4 p-3 d-flex gap-3 align-items-start">
//                 <span className="material-symbols-outlined text-blue-600 fs-4">lightbulb</span>
//                 <div>
//                   <span className="text-blue-900 fw-bold d-block small">Tip:</span>
//                   <p className="text-blue-800 small mb-0">Use the STAR method – Situation, Task, Action, Result</p>
//                 </div>
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <button
//                 onClick={handlePrevious}
//                 className="btn btn-light border border-slate-200 rounded-4 px-4 py-3 fw-bold text-slate-700 shadow-sm"
//               >
//                 Previous Question
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="btn bg-emerald-600 text-white border-0 rounded-4 px-5 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg"
//                 style={{ backgroundColor: '#059669' }}
//               >
//                 <span className="material-symbols-outlined fs-6">check_circle</span>
//                 Submit Interview
//               </button>
//             </div>
//           </div>

//           {/* Right Column (1/3 width) */}
//           <div className="col-lg-4 d-flex flex-column gap-4">
//             {/* Questions Overview Card */}
//             <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4">
//               <h3 className="fw-bold text-slate-800 mb-4 fs-5">Questions Overview</h3>
//               <div className="d-flex flex-column gap-2">
//                 {questions.map((q) => (
//                   <div
//                     key={q.id}
//                     className={`p-3 rounded-4 border ${q.completed
//                       ? 'border-emerald-100 bg-emerald-50 d-flex justify-content-between align-items-start'
//                       : q.current
//                         ? 'border-2 border-primary bg-blue-50 d-flex justify-content-between align-items-center'
//                         : 'border-slate-200'
//                       }`}
//                   >
//                     <div>
//                       <span className="fw-bold text-slate-800 d-block">Question {q.id}</span>
//                       <span className="small text-slate-500">{q.title}</span>
//                     </div>
//                     {q.completed && <span className="material-symbols-outlined text-emerald-500">check_circle</span>}
//                     {q.current && (
//                       <span className="badge bg-primary text-white px-3 py-2 rounded-3 fw-bold" style={{ backgroundColor: '#1152d4' }}>
//                         Current
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Interview Stats Card */}
//             <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4">
//               <h3 className="fw-bold text-slate-800 mb-4 fs-5">Interview Stats</h3>
//               <div className="d-flex flex-column gap-4">
//                 <div>
//                   <div className="d-flex justify-content-between align-items-center small fw-bold mb-2">
//                     <span className="text-slate-500 text-uppercase">Completion</span>
//                     <span className="text-slate-800">100%</span>
//                   </div>
//                   <div className="progress" style={{ height: 8 }}>
//                     <div className="progress-bar bg-dark" style={{ width: '100%' }} role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}></div>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-column gap-2">
//                   <div className="d-flex justify-content-between align-items-center border-bottom border-slate-100 pb-2">
//                     <span className="small fw-bold text-slate-400 text-uppercase">Answered</span>
//                     <span className="font-monospace fw-bold text-slate-700">1 / 5</span>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="small fw-bold text-slate-400 text-uppercase">Remaining</span>
//                     <span className="font-monospace fw-bold text-slate-700">4</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Ai;



import React, { useState } from 'react';
import Header from '../../components/ai/Header'
import QuestionCard from '../../components/ai/QuestionCard';
import AnswerCard from '../../components/ai/AnswerCard';
import FooterButtons from '../../components/ai/FooterButtons';
import QuestionsOverview from '../../components/ai/QuestionsOverview';
import InterviewStats from '../../components/ai/InterviewStats';

const Ai: React.FC = () => {
  // State
  const [answer, setAnswer] = useState<string>('');
  const wordCount = answer.trim() === '' ? 0 : answer.trim().split(/\s+/).length;

  // Static data (could come from props or context)
  const questions = [
    { id: 1, title: 'JavaScript Fundamentals', completed: true, current: false },
    { id: 2, title: 'React Performance', completed: false, current: false },
    { id: 3, title: 'Problem Solving', completed: false, current: false },
    { id: 4, title: 'Database Design', completed: false, current: false },
    { id: 5, title: 'Teamwork', completed: false, current: true },
  ];

  // Handlers
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
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
  const answeredCount = questions.filter((q) => q.completed).length;
  const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // Timer values (static for demo)
  const timeRemaining = '2:26';
  const timerPercentage = 75; // e.g., 75% remaining

  // Current question data
  const tags = ['Teamwork', 'Easy', 'Behavioral'];
  const questionText =
    'Describe a situation where you had to work with a difficult team member. How did you handle it?';

  return (
    <div className="d-flex flex-column min-vh-100 w-100 bg-slate-50">
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
              questionNumber={currentQuestionNumber}
              questionText={questionText}
            />
            <AnswerCard
              answer={answer}
              wordCount={wordCount}
              onAnswerChange={handleAnswerChange}
            />
            <FooterButtons
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Column (1/3) */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <QuestionsOverview questions={questions} />
            <InterviewStats
              completionPercentage={completionPercentage}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ai;