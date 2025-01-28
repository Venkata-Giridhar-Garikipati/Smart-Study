"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashCardItem from "./_components/FlashCardItem";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Flashcards() {
  const { courseId } = useParams();
  const route = useRouter();
  const [flashCards, setFlashCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    GetFlashCards();
  }, []);

  const GetFlashCards = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "flashcards",
      });
      const flashCardData = result?.data?.[0]?.content || [];
      setFlashCards(flashCardData);
      setStepCount(0);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleNext = () => {
    if (stepCount < flashCards.length - 1) {
      setStepCount((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (stepCount > 0) {
      setStepCount((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

    const handlePreviousStart = () => {
      if (stepCount >= 0) {
          setStepCount(0);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!flashCards || flashCards.length === 0) {
    return (
      <div className="p-4 lg:p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="font-bold text-3xl md:text-4xl text-center text-gray-800 mb-4">
          Flashcards
        </h2>
        <p className="text-center text-lg text-gray-600">
          Flashcards: The Ultimate Tool to Lock in Concepts!
        </p>
        <div className="text-center mt-10">Loading or No Flashcards Available...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 flex flex-col items-center justify-start min-h-screen">
      <h2 className="font-bold text-3xl md:text-4xl text-center text-gray-800 mb-4">
        Flashcards
      </h2>
      <p className="text-center text-lg text-gray-600">
        Flashcards: The Ultimate Tool to Lock in Concepts!
      </p>

       <div className="flex items-center justify-center mt-10 w-full">
        <ArrowLeft
            className={`w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-800 ml-0 mr-10 ${stepCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={stepCount > 0 ? handlePrevious : handlePreviousStart}
        />

        <div className="w-full max-w-[400px] flex justify-center">
          <FlashCardItem
            handleClick={handleFlip}
            isFlipped={isFlipped}
            flashcard={flashCards[stepCount]}
          />
        </div>
        {stepCount < flashCards.length - 1 ? (
          <ArrowRight
            className="w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-800 mr-0 ml-10 "
            onClick={handleNext}
          />
        ) : (
          <ArrowRight
            className="w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-800 mr-0 ml-10"
             onClick={() => route.push(`/course/${courseId}`)}
          />
        )}
      </div>


      {stepCount === flashCards.length - 1 && (
        <div className="mt-6">
          <p className="text-lg font-semibold text-center">End of Flashcards!</p>
        </div>
      )}
    </div>
  );
}

export default Flashcards;