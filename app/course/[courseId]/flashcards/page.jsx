"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FlashCardItem from "./_components/FlashCardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Flashcards() {
  const { courseId } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [api, setApi] = useState();

  useEffect(() => {
    GetFlashCards();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setIsFlipped(false);
    });
  }, [api]);

  const GetFlashCards = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: 'flashcards',
      });
        console.log(result.data);
      const flashCardData = result?.data?.[0]?.content || [];
      setFlashCards(flashCardData);
      console.log("Flashcards content", flashCardData);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="p-4 lg:p-8">
      <h2 className="font-bold text-3xl md:text-4xl text-center text-gray-800 mb-4">
        Flashcards
      </h2>
      <p className="text-center text-lg text-gray-600">
        Flashcards: The Ultimate Tool to Lock in Concepts!
      </p>

      <div className="flex items-center justify-center mt-10">
        <Carousel setApi={setApi} className="w-full lg:w-[80%]">
          <CarouselContent className="gap-6">
            {flashCards.map((flashcard, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center"
              >
                <FlashCardItem
                  handleClick={handleClick}
                  isFlipped={isFlipped}
                  flashcard={flashcard}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-gray-500 hover:text-gray-800" />
          <CarouselNext className="text-gray-500 hover:text-gray-800" />
        </Carousel>
      </div>
    </div>
  );
}

export default Flashcards;
