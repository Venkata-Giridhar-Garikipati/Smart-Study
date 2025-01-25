import React from 'react';
import ReactCardFlip from 'react-card-flip';

function FlashCardItem({ handleClick, isFlipped, flashcard }) {
  return (
    <div className="flex items-center justify-center p-4">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front of the card */}
        <div
          className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] shadow-xl transition-transform transform hover:scale-105"
          onClick={handleClick}
        >
          <h2 className="text-center text-lg md:text-2xl font-semibold">{flashcard?.front}</h2>
        </div>

        {/* Back of the card */}
        <div
          className="p-4 bg-white text-gray-900 border border-gray-200 flex items-center justify-center rounded-lg cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px] shadow-xl transition-transform transform hover:scale-105"
          onClick={handleClick}
        >
          <h2 className="text-center text-lg md:text-2xl font-semibold">{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashCardItem;
