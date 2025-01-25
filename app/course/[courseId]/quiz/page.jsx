"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StepProgress from "../_components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";

function Quiz() {
  const { courseId } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [courseId]);

  const fetchQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: 'quiz',
      });
      console.log(result?.data)
      setQuizData(result?.data);
      console.log(result?.data?.[0]?.content?.questions || [])
      setQuiz(result?.data?.[0]?.content?.questions || []);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    const isCorrect = userAnswer === currentQuestion?.correctAnswer;
    setIsCorrectAnswer(isCorrect);
    setCorrectAnswer(currentQuestion?.correctAnswer);
   //if(userAnswer==currentQuestion?.correctAnswer){
   // setCorrectAnswer(true);
   // return ;
   //}
   //setCorrectAnswer(false);
  };

  useEffect(() => {
    setCorrectAnswer(null);
   setIsCorrectAnswer(null);
  }, [stepCount]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center mb-4">Quiz</h2>
    <StepProgress data={quiz} stepCount={stepCount} setStepCount={(v)=>setStepCount(v)} />
      <div>
       {/*{quiz&&quiz.map((item,index)=>(      */} 
          <QuizCardItem quiz={quiz[stepCount]} 
          userSelectedOption={(v)=>checkAnswer(v,quiz[stepCount])}/>
        {/* ))}*/} 
      </div>
     {isCorrectAnswer==false&&<div>
      <div className="border p-3 border-red-700 bg-red-200 rounded-lg">
        <h2 className="font-bold text-lg text-red-600">Incorrect</h2>
        <p>Correct Answer is : {correctAnswer}</p>
        </div>
     </div>}
     {isCorrectAnswer==true&&<div>
      <div className="border p-3 border-green-700 bg-green-200 rounded-lg">
        <h2 className="font-bold text-lg text-green-600">Correct</h2>
        <p >Your answer is correct</p>
        </div>
</div>}
    </div>     
  );
}

export default Quiz;