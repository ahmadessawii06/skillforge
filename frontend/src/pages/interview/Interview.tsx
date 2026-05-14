import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/interview/QuestionCard";
import FooterButtons from "../../components/interview/FooterButtons";
import QuestionsOverview from "../../components/interview/QuestionsOverview";
import InterviewStats from "../../components/interview/InterviewStats";
import { useInterviewQuestions } from "../../../hooks/useInterviewQuestions";
import { generateAnalysis } from "../../../services/analysisService";
import type { GenerateInterviewQuestionsRequest } from "../../../services/interviewQuestionService";
import LoadingPage from "../../components/common/loading/LoadingPage";
import NoCv from "../../components/common/NoCV";

const defaultGenerationRequest: GenerateInterviewQuestionsRequest = {
  role: "Frontend Developer",
  experienceLevel: "junior",
  difficulty: "mixed",
  count: 5,
  skills: ["JavaScript", "React", "CSS", "Databases", "Teamwork"],
  questionTypes: ["technical", "problem_solving", "behavioral"],
};

const Ai: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const routeState = location.state as {
    generationRequest?: GenerateInterviewQuestionsRequest;
  } | null;
  const interviewId = parseInterviewId(
    searchParams.get("interviewId") ||
    routeState?.generationRequest?.interviewId,
  );
  const initialGenerationRequest: GenerateInterviewQuestionsRequest = {
    ...defaultGenerationRequest,
    ...routeState?.generationRequest,
    interviewId: interviewId || routeState?.generationRequest?.interviewId,
    saveToInterview: Boolean(interviewId),
  };
  const { questions, loading, error, setQuestions } = useInterviewQuestions(
    [],
    initialGenerationRequest,
    true,
  );

  React.useEffect(() => {
    if (error) {
      console.error('AI Page Error:', error);
    }
    if (questions.length > 0) {
      console.log('Questions loaded:', questions.length);
    }
  }, [error, questions.length]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerEvaluated, setAnswerEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showErrorEffect, setShowErrorEffect] = useState<boolean>(false);
  const [submittingAnalysis, setSubmittingAnalysis] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetAnswerState = React.useCallback(() => {
    setSelectedAnswer(null);
    setAnswerEvaluated(false);
    setIsCorrect(null);
    setShowErrorEffect(false);
    setShowConfetti(false);
  }, []);

  React.useEffect(() => {
    setCurrentQuestionIndex(0);
    resetAnswerState();
  }, [location.key, resetAnswerState]);

  const activeQuestionIndex = Math.min(
    currentQuestionIndex,
    Math.max(questions.length - 1, 0),
  );
  const currentQuestion = questions[activeQuestionIndex] || questions[0];
  const currentQuestionNumber = activeQuestionIndex + 1;
  const totalQuestions = questions.length;
  const currentOptions = currentQuestion?.options || [];
  const correctAnswerId = currentOptions.find((option) => option.isCorrect)?.id;
  const tags = currentQuestion?.tags?.length
    ? currentQuestion.tags
    : ["Interview", currentQuestion?.difficulty || "Mixed"];

  const answeredCount = questions.filter((q) => q.completed).length;
  const completionPercentage = totalQuestions
    ? Math.round((answeredCount / totalQuestions) * 100)
    : 0;
  const isQuestionLast = activeQuestionIndex >= totalQuestions - 1;

  const handleOptionSelect = (optionId: string) => {
    if (answerEvaluated) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !correctAnswerId) return;

    const correct = selectedAnswer === correctAnswerId;
    setAnswerEvaluated(true);
    setIsCorrect(correct);

    setQuestions((previousQuestions) =>
      previousQuestions.map((question, index) =>
        index === activeQuestionIndex
          ? {
            ...question,
            completed: true,
            isCorrect: correct,
            current: false,
            selectedOptionId: selectedAnswer,
          }
          : question,
      ),
    );

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    } else {
      setShowErrorEffect(true);
      setTimeout(() => setShowErrorEffect(false), 1500);
    }
  };

  const moveToNextQuestion = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setQuestions((previousQuestions) =>
        previousQuestions.map((question, index) => ({
          ...question,
          current: index === activeQuestionIndex + 1,
        })),
      );
      setCurrentQuestionIndex(activeQuestionIndex + 1);
      resetAnswerState();
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      const newIndex = activeQuestionIndex - 1;
      setQuestions((previousQuestions) =>
        previousQuestions.map((question, index) => ({
          ...question,
          current: index === newIndex,
        })),
      );
      setCurrentQuestionIndex(newIndex);
      resetAnswerState();
    }
  };

  const handleSubmit = async () => {
    if (!interviewId || submittingAnalysis) {
      setSubmitError(
        "This interview was not saved in the backend. Please start from the CV page again.",
      );
      return;
    }

    setSubmittingAnalysis(true);
    setSubmitError(null);
    console.log("Submitting analysis for interview:", interviewId);
    console.log("Submitted questions:", questions.map(q => ({ id: q.id, selected: q.selectedOptionId })));

    try {
      const response = await generateAnalysis(interviewId, {
        questions: questions.map((question) => ({
          id: question.id,
          selectedOptionId: question.selectedOptionId,
          userAnswer: question.options.find(
            (option) => option.id === question.selectedOptionId,
          )?.text,
          options: question.options,
        })),
      });

      navigate(`/analysis?interviewId=${interviewId}`, {
        state: {
          analysis: response.data,
        },
      });
    } catch (err: unknown) {
      setSubmitError(
        getErrorMessage(err, "Could not generate analysis for this interview."),
      );
    } finally {
      setSubmittingAnalysis(false);
    }
  };



  const hasData = Boolean(
    interviewId || routeState?.generationRequest
  );
  if (!hasData) {
    return (
      <main className="bg-light">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="container bg-white rounded-5 shadow-sm border border-slate-200 p-4 text-center">
            <NoCv />
          </div>
        </div>
      </main>

    );
  }
  if (submittingAnalysis) return <LoadingPage />;

  if (loading && questions.length === 0) return <LoadingPage />;

  if (error) {
    return (
      <div style={{ marginTop: "100px" }} className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Generating Questions</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
            {' '}
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/cv')}
            >
              Go Back to CV
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <div style={{ marginTop: "100px" }} className="container py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Questions Available</h4>
          <p>Unable to load interview questions. Please try again.</p>
          <hr />
          <p className="mb-0">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
            {' '}
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/cv')}
            >
              Go Back to CV
            </button>
          </p>
        </div>
      </div>
    );
  }


  return (
    <div
      className="d-flex flex-column min-vh-100 w-100 bg-slate-50"
      style={{ marginTop: "100px" }}
    >
      {showConfetti && (
        <div
          className="confetti-success"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 9999,
            background:
              "radial-gradient(circle at center, rgba(5, 150, 105, 0.1) 0%, transparent 70%)",
            animation: "confettiSuccess 0.5s ease-out",
          }}
        />
      )}

      {showErrorEffect && (
        <div
          className="confetti-error"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 9999,
            background:
              "radial-gradient(circle at center, rgba(220, 38, 38, 0.1) 0%, transparent 70%)",
            animation: "confettiError 0.5s ease-out",
          }}
        />
      )}




      <main className="container py-5 px-3 px-md-5 flex-grow-1">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-8 d-flex flex-column gap-4">
            <div className="bg-white  shadow-sm border border-slate-200 p-3 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
              <div>
                <span className="fw-bold text-slate-800 d-block">
                  {loading
                    ? "Generating questions..."
                    : error
                      ? "Error generating questions"
                      : "AI Questions Ready...Lets Forge Your Skills!"}
                </span>
                {error && <span className="small text-danger">{error}</span>}
                {submitError && (
                  <span className="small text-danger d-block">
                    {submitError}
                  </span>
                )}
              </div>
              {interviewId && (
                <span className="badge  bg-primary-subtle text-primary px-3 py-2">
                  Interview #{interviewId}
                </span>
              )}
            </div>

            <QuestionCard
              tags={tags}
              questionNumber={currentQuestionNumber}
              questionText={currentQuestion.questionText}
            />

            <div className="bg-white rounded-5 shadow-sm border border-slate-200 p-4 p-xl-5">
              <h3 className="fw-bold text-slate-800 mb-4">
                Select the Correct Answer
              </h3>
              <div className="d-flex flex-column gap-3">
                {currentOptions.map((option) => {
                  let borderColor = "#e2e8f0";
                  let backgroundColor = "white";
                  let borderWidth = "2px";

                  if (selectedAnswer === option.id) {
                    if (answerEvaluated) {
                      if (isCorrect) {
                        borderColor = "#059669";
                        backgroundColor = "#d1fae5";
                        borderWidth = "3px";
                      } else {
                        borderColor = "#dc2626";
                        backgroundColor = "#fee2e2";
                        borderWidth = "3px";
                      }
                    } else {
                      borderColor = "#1152d4";
                      backgroundColor = "rgba(17, 82, 212, 0.05)";
                    }
                  } else if (
                    answerEvaluated &&
                    isCorrect === false &&
                    option.id === correctAnswerId
                  ) {
                    borderColor = "#059669";
                    backgroundColor = "#d1fae5";
                  }

                  return (
                    <label
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="d-flex align-items-center p-4 rounded-4 border-2 cursor-pointer transition-all"
                      style={{
                        cursor: answerEvaluated ? "default" : "pointer",
                        borderColor,
                        backgroundColor,
                        borderWidth,
                        transition: "all 0.3s ease",
                        opacity:
                          answerEvaluated &&
                            selectedAnswer !== option.id &&
                            option.id !== correctAnswerId
                            ? 0.5
                            : 1,
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: `2px solid ${selectedAnswer === option.id ? "#1152d4" : "#cbd5e1"}`,
                          backgroundColor:
                            selectedAnswer === option.id ? "#1152d4" : "white",
                          marginRight: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {selectedAnswer === option.id && (
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: "white",
                            }}
                          />
                        )}
                      </div>
                      <span
                        className={`text-slate-700 fw-500 ${answerEvaluated && selectedAnswer === option.id && !isCorrect ? "text-danger" : ""}`}
                      >
                        {option.text}
                        {answerEvaluated &&
                          selectedAnswer === option.id &&
                          isCorrect && (
                            <span
                              className="material-symbols-outlined text-success ms-2"
                              style={{ fontSize: "18px" }}
                            >
                              check_circle
                            </span>
                          )}
                        {answerEvaluated &&
                          selectedAnswer === option.id &&
                          !isCorrect && (
                            <span
                              className="material-symbols-outlined text-danger ms-2"
                              style={{ fontSize: "18px" }}
                            >
                              error
                            </span>
                          )}
                      </span>
                    </label>
                  );
                })}
              </div>

              {answerEvaluated && (
                <div
                  className={`mt-4 p-4 rounded-4 border-2 ${isCorrect ? "bg-success-light border-success" : "bg-danger-light border-danger"}`}
                  style={{ animation: "slideUp 0.3s ease-out" }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <span
                      className="material-symbols-outlined fs-4"
                      style={{ color: isCorrect ? "#059669" : "#dc2626" }}
                    >
                      {isCorrect ? "celebration" : "info"}
                    </span>
                    <div>
                      <span
                        className={`fw-bold d-block small ${isCorrect ? "text-success" : "text-danger"}`}
                      >
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </span>
                      <p className="text-muted small mb-0 mt-1">
                        {isCorrect
                          ? currentQuestion.explanation
                          : `The correct answer is: ${currentOptions.find((opt) => opt.id === correctAnswerId)?.text}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.hint && (
                <div className="bg-blue-50 border border-blue-200 rounded-4 p-3 d-flex gap-3 align-items-start mt-4">
                  <i className="fa-regular fa-lightbulb text-blue-600 fs-4"></i>
                  <div>
                    <span className="text-blue-900 fw-bold d-block small">
                      Hint:
                    </span>
                    <p className="text-blue-800 small mb-0">
                      {currentQuestion.hint}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <FooterButtons
              onPrevious={handlePrevious}
              onNextOrSubmit={
                answerEvaluated
                  ? isQuestionLast
                    ? handleSubmit
                    : moveToNextQuestion
                  : handleSubmitAnswer
              }
              isNext={activeQuestionIndex < questions.length - 1}
              isAnswerEvaluated={answerEvaluated}
              hasSelection={!!selectedAnswer && !submittingAnalysis}
              canGoPrevious={activeQuestionIndex > 0}
            />
          </div>

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

      <style>{`
        @keyframes confettiSuccess {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes confettiError {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .border-success {
          border-color: #059669 !important;
        }
        .border-danger {
          border-color: #dc2626 !important;
        }
        .bg-success-light {
          background-color: #d1fae5 !important;
        }
        .bg-danger-light {
          background-color: #fee2e2 !important;
        }
        .text-success {
          color: #059669 !important;
        }
        .text-danger {
          color: #dc2626 !important;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 1;
        }
      `}</style>
    </div>
  );
};

export default Ai;

function parseInterviewId(
  value: string | number | undefined | null,
): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object") {
    const maybeError = error as { message?: unknown; error?: unknown };
    if (typeof maybeError.message === "string") return maybeError.message;
    if (typeof maybeError.error === "string") return maybeError.error;
  }

  return fallback;
}