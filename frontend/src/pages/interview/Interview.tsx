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
    searchParams.get("interviewId") || routeState?.generationRequest?.interviewId,
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
    if (error) console.error("AI Page Error:", error);
    if (questions.length > 0) console.log("Questions loaded:", questions.length);
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

  const activeQuestionIndex = Math.min(currentQuestionIndex, Math.max(questions.length - 1, 0));
  const currentQuestion = questions[activeQuestionIndex] || questions[0];
  const currentQuestionNumber = activeQuestionIndex + 1;
  const totalQuestions = questions.length;
  const currentOptions = currentQuestion?.options || [];
  const correctAnswerId = currentOptions.find((option) => option.isCorrect)?.id;
  const tags = currentQuestion?.tags?.length ? currentQuestion.tags : ["Interview", currentQuestion?.difficulty || "Mixed"];

  const answeredCount = questions.filter((q) => q.completed).length;
  const completionPercentage = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;
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
          ? { ...question, completed: true, isCorrect: correct, current: false, selectedOptionId: selectedAnswer }
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
      setQuestions((previousQuestions) =>
        previousQuestions.map((question, index) => ({
          ...question,
          current: index === activeQuestionIndex - 1,
        })),
      );
      setCurrentQuestionIndex(activeQuestionIndex - 1);
      resetAnswerState();
    }
  };

  const handleSubmit = async () => {
    if (!interviewId || submittingAnalysis) {
      setSubmitError("This interview was not saved in the backend. Please start from the CV page again.");
      return;
    }
    setSubmittingAnalysis(true);
    setSubmitError(null);
    try {
      const response = await generateAnalysis(interviewId, {
        questions: questions.map((question) => ({
          id: question.id,
          selectedOptionId: question.selectedOptionId,
          userAnswer: question.options.find((option) => option.id === question.selectedOptionId)?.text,
          options: question.options,
        })),
      });
      navigate(`/analysis?interviewId=${interviewId}`, { state: { analysis: response.data } });
    } catch (err: unknown) {
      setSubmitError(getErrorMessage(err, "Could not generate analysis for this interview."));
    } finally {
      setSubmittingAnalysis(false);
    }
  };

  const hasData = Boolean(interviewId || routeState?.generationRequest);
  if (!hasData) {
    return (
      <main className="bg-[#0A0A0F]">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-6 text-center max-w-md">
            <NoCv />
          </div>
        </div>
      </main>
    );
  }
  if (loading && questions.length === 0) return <LoadingPage />;

  if (error) {
    return (
      <div className="container py-5" style={{ marginTop: "100px" }}>
        <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-2">Error Generating Questions</h4>
          <p className="text-[#A1A1AA] mb-4">{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="container py-5" style={{ marginTop: "100px" }}>
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-2">No Questions Available</h4>
          <p className="text-[#A1A1AA] mb-4">Unable to load interview questions. Please try again.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]" style={{ marginTop: "100px" }}>
      {showConfetti && (
        <div className="confetti-success fixed inset-0 pointer-events-none z-50" style={{ background: "radial-gradient(circle at center, rgba(5, 150, 105, 0.1) 0%, transparent 70%)", animation: "confettiSuccess 0.5s ease-out" }} />
      )}
      {showErrorEffect && (
        <div className="confetti-error fixed inset-0 pointer-events-none z-50" style={{ background: "radial-gradient(circle at center, rgba(220, 38, 38, 0.1) 0%, transparent 70%)", animation: "confettiError 0.5s ease-out" }} />
      )}

      <main className="container py-5 px-4 md:px-8 flex-grow-1">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Status Bar */}
            <div className="bg-[#1E293B] border border-white/[0.06] rounded-2xl p-4 flex flex-col md:flex-row justify-between gap-3 items-center">
              <div>
                <span className="font-bold text-white block">
                  {loading ? "Generating questions..." : error ? "Error generating questions" : "AI Questions Ready...Lets Forge Your Skills!"}
                </span>
                {error && <span className="text-sm text-[#EF4444] block">{error}</span>}
                {submitError && <span className="text-sm text-[#EF4444] block">{submitError}</span>}
              </div>
              {interviewId && (
                <span className="badge bg-[#7C3AED]/15 text-[#7C3AED] px-3 py-2 rounded-lg text-sm font-bold">
                  Interview #{interviewId}
                </span>
              )}
            </div>

            {/* Question Card */}
            <QuestionCard tags={tags} questionNumber={currentQuestionNumber} questionText={currentQuestion.questionText} />

            {/* Answer Options */}
            <div className="bg-[#1E293B] rounded-2xl border border-white/[0.06] p-5 md:p-6 lg:p-8">
              <h3 className="font-bold text-white mb-5">Select the Correct Answer</h3>
              <div className="flex flex-col gap-3">
                {currentOptions.map((option) => {
                  let borderColor = "#27272A";
                  let backgroundColor = "#1E293B";
                  let borderWidth = "2px";

                  if (selectedAnswer === option.id) {
                    if (answerEvaluated) {
                      if (isCorrect) {
                        borderColor = "#059669";
                        backgroundColor = "rgba(5, 150, 105, 0.1)";
                        borderWidth = "3px";
                      } else {
                        borderColor = "#dc2626";
                        backgroundColor = "rgba(220, 38, 38, 0.1)";
                        borderWidth = "3px";
                      }
                    } else {
                      borderColor = "#7C3AED";
                      backgroundColor = "rgba(124, 58, 237, 0.1)";
                    }
                  } else if (answerEvaluated && isCorrect === false && option.id === correctAnswerId) {
                    borderColor = "#059669";
                    backgroundColor = "rgba(5, 150, 105, 0.1)";
                  }

                  return (
                    <label
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all"
                      style={{
                        cursor: answerEvaluated ? "default" : "pointer",
                        borderColor,
                        backgroundColor,
                        borderWidth,
                        transition: "all 0.3s ease",
                        opacity: answerEvaluated && selectedAnswer !== option.id && option.id !== correctAnswerId ? 0.5 : 1,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-4"
                        style={{
                          borderColor: selectedAnswer === option.id ? "#7C3AED" : "#3F3F46",
                          backgroundColor: selectedAnswer === option.id ? "#7C3AED" : "transparent",
                        }}
                      >
                        {selectedAnswer === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className={`text-[#A1A1AA] font-medium ${answerEvaluated && selectedAnswer === option.id && !isCorrect ? "text-[#EF4444]" : ""}`}>
                        {option.text}
                        {answerEvaluated && selectedAnswer === option.id && isCorrect && (
                          <span className="material-symbols-outlined text-[#059669] ml-2 text-base">check_circle</span>
                        )}
                        {answerEvaluated && selectedAnswer === option.id && !isCorrect && (
                          <span className="material-symbols-outlined text-[#dc2626] ml-2 text-base">error</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>

              {answerEvaluated && (
                <div className={`mt-5 p-4 rounded-xl border-2 ${isCorrect ? "bg-[#059669]/10 border-[#059669]" : "bg-[#dc2626]/10 border-[#dc2626]"}`} style={{ animation: "slideUp 0.3s ease-out" }}>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-xl" style={{ color: isCorrect ? "#059669" : "#dc2626" }}>
                      {isCorrect ? "celebration" : "info"}
                    </span>
                    <div>
                      <span className={`font-bold text-xs block ${isCorrect ? "text-[#059669]" : "text-[#dc2626]"}`}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </span>
                      <p className="text-[#A1A1AA] text-sm mt-1 mb-0">
                        {isCorrect ? currentQuestion.explanation : `The correct answer is: ${currentOptions.find((opt) => opt.id === correctAnswerId)?.text}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.hint && (
                <div className="bg-[#1E40AF]/10 border border-[#1E40AF]/30 rounded-xl p-4 flex gap-3 items-start mt-5">
                  <i className="fa-regular fa-lightbulb text-[#3B82F6] text-xl"></i>
                  <div>
                    <span className="text-[#93C5FD] font-bold text-xs block">Hint:</span>
                    <p className="text-[#A1A1AA] text-sm mb-0">{currentQuestion.hint}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <FooterButtons
              onPrevious={handlePrevious}
              onNextOrSubmit={answerEvaluated ? (isQuestionLast ? handleSubmit : moveToNextQuestion) : handleSubmitAnswer}
              isNext={activeQuestionIndex < questions.length - 1}
              isAnswerEvaluated={answerEvaluated}
              hasSelection={!!selectedAnswer && !submittingAnalysis}
              canGoPrevious={activeQuestionIndex > 0}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <QuestionsOverview questions={questions} />
            <InterviewStats completionPercentage={completionPercentage} answeredCount={answeredCount} totalQuestions={totalQuestions} />
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
      `}</style>
    </div>
  );
};

export default Ai;

function parseInterviewId(value: string | number | undefined | null): number | null {
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
