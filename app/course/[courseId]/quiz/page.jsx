"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const Quiz = () => {
  const { courseId } = useParams();
  const router = useRouter();
  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [courseId]);

  const fetchQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: 'quiz',
      });
      setQuizData(result?.data);
      const questions = result?.data?.[0]?.content?.questions;
      setQuiz(questions || []);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    if (userAnswers[stepCount]) return;

    const correctAnswerFromBack = currentQuestion?.correctAnswer;
    const explanationFromBack = currentQuestion?.explanation;
    let isCorrect;

    if (Array.isArray(correctAnswerFromBack)) {
      if (!Array.isArray(userAnswer)) {
        isCorrect = false;
      } else {
        isCorrect = userAnswer.length === correctAnswerFromBack.length && 
                    userAnswer.every(item => correctAnswerFromBack.includes(item));
      }
    } else {
      isCorrect = userAnswer === correctAnswerFromBack;
    }

    setIsCorrectAnswer(isCorrect);
    setCorrectAnswer(correctAnswerFromBack);
    setExplanation(explanationFromBack);
    setUserAnswers((prev) => ({ ...prev, [stepCount]: userAnswer }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setCorrectAnswer(null);
    setExplanation(null);
    setIsCorrectAnswer(null);
  }, [stepCount]);

  useEffect(() => {
    if (quiz && quiz.length > 0 && stepCount === quiz.length) {
      setQuizCompleted(true);
    }
  }, [stepCount, quiz]);

  const currentQuestion = quiz && quiz[stepCount];
  const incorrectAnswers = quiz.length - score;
  const scorePercentage = (score / quiz.length) * 100;

  const CompletionSummary = () => (
    <div className="mt-10 p-5">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Completed!</h2>
        
        <div className="flex justify-center items-center mb-8">
          <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{Math.round(scorePercentage)}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-600">Correct Answers</span>
            </div>
            <span className="font-bold text-green-600">{score}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600">Incorrect Answers</span>
            </div>
            <span className="font-bold text-red-600">{incorrectAnswers}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Total Questions</span>
            <span className="font-bold text-gray-600">{quiz.length}</span>
          </div>
        </div>

        <Button 
          className="w-full mt-6 h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold"
          onClick={() => router.back()}
        >
          Return to Course
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4">
      {quizCompleted ? (
        <CompletionSummary />
      ) : (
        <>
          <h2 className="font-bold text-2xl text-center mb-8">Quiz</h2>
          <StepProgress
            data={quiz}
            stepCount={stepCount}
            setStepCount={(v) => setStepCount(v)}
          />
          <div className="mb-6">
            {currentQuestion && (
              <QuizCardItem
                quiz={currentQuestion}
                userSelectedOption={(v) => checkAnswer(v, currentQuestion)}
                selectedOptions={userAnswers[stepCount]}
              />
            )}
          </div>
          {isCorrectAnswer !== null && (
            <div className={`mt-6 p-4 rounded-lg ${
              isCorrectAnswer 
                ? 'border border-green-700 bg-green-50' 
                : 'border border-red-700 bg-red-50'
            }`}>
              <h2 className={`font-bold text-lg ${
                isCorrectAnswer ? 'text-green-700' : 'text-red-700'
              }`}>
                {isCorrectAnswer ? 'Correct!' : 'Incorrect'}
              </h2>
              {!isCorrectAnswer && (
                <p className="text-gray-700 mt-2">
                  {Array.isArray(correctAnswer) 
                    ? `Correct Answers: ${correctAnswer.join(', ')}` 
                    : `Correct Answer: ${correctAnswer}`}
                </p>
              )}
              {explanation && (
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Explanation:</span> {explanation}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;