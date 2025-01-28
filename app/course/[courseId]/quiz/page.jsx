"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";
import { Button } from "@/components/ui/button";

function Quiz() {
  const { courseId } = useParams();
  const router = useRouter();
  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [explanation, setExplanation] = useState(null)
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
     // console.log("API result data:", result?.data);
      setQuizData(result?.data);
      const questions = result?.data?.[0]?.content?.questions;
     // console.log("Extracted Questions:", questions);
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


      if (Array.isArray(correctAnswerFromBack)) { // Handling multiple correct answers for multiple choice question

          if (!Array.isArray(userAnswer)){
              isCorrect = false;
          }else{
              isCorrect = userAnswer.length === correctAnswerFromBack.length && userAnswer.every(item => correctAnswerFromBack.includes(item))
          }


      } else { // Handling single correct answer
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
      setExplanation(null)
    setIsCorrectAnswer(null);
  }, [stepCount]);

  useEffect(() => {
    if (quiz && quiz.length > 0 && stepCount === quiz.length) {
      setQuizCompleted(true);
    }
  }, [stepCount, quiz]);

  const currentQuestion = quiz && quiz[stepCount];
 // console.log("Current Question", currentQuestion);

  return (
    <div>
      
      {quizCompleted ? (
        <div className="mt-10 p-5 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Completed!</h2>
            <p className="text-lg text-gray-700 mb-4">
              Your Score: <span className="font-bold text-primary">{score}</span> / {quiz.length}
            </p>
             <Button className="rounded-full shadow-md mt-4 w-full" onClick={() => router.back()}>
               Go to Course Page
              </Button>
          </div>
        </div>
      ) : (
        <>
        <h2 className="font-bold text-2xl text-center mb-4">Quiz</h2>
          <StepProgress
            data={quiz}
            stepCount={stepCount}
            setStepCount={(v) => setStepCount(v)}
          />
          <div>
            {currentQuestion && (
              <QuizCardItem
                quiz={currentQuestion}
                userSelectedOption={(v) => checkAnswer(v, currentQuestion)}
                selectedOptions={userAnswers[stepCount]}
              />
            )}
          </div>
          {isCorrectAnswer === false && (
            <div className="border p-3 border-red-700 bg-red-200 rounded-lg">
              <h2 className="font-bold text-lg text-red-600">Incorrect</h2>
             {Array.isArray(correctAnswer) ? (
                  <p>Correct Answers: {correctAnswer.join(', ')}</p>
              ) : (
                   <p>Correct Answer is: {correctAnswer}</p>
                )}
                <p>Explanation: {explanation}</p>
            </div>
          )}
          {isCorrectAnswer === true && (
            <div className="border p-3 border-green-700 bg-green-200 rounded-lg">
              <h2 className="font-bold text-lg text-green-600">Correct</h2>
              <p>Your answer is correct</p>
                <p>Explanation: {explanation}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;