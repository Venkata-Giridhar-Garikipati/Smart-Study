import React, { useState, useEffect } from "react";

function QuizCardItem({ quiz, userSelectedOption, selectedOptions: parentSelectedOptions }) {
    const [selectedOption, setSelectedOption] = useState(Array.isArray(parentSelectedOptions) ? parentSelectedOptions : (parentSelectedOptions ? [parentSelectedOptions] : []));
    const [isOptionSelected, setIsOptionSelected] = useState(selectedOption.length > 0); // Track if any option is selected

    useEffect(() => {
      setSelectedOption(Array.isArray(parentSelectedOptions) ? parentSelectedOptions : (parentSelectedOptions ? [parentSelectedOptions] : []));
       setIsOptionSelected(parentSelectedOptions?.length > 0);
    }, [parentSelectedOptions]);

    const handleOptionClick = (option) => {
        if (quiz?.type === 'multiple_choice') {
            const isOptionAlreadySelected = selectedOption.includes(option)
            if (isOptionAlreadySelected && quiz.type !== 'multiple_select') {
                return;
            }


          if(quiz.type === 'multiple_select'){
             if (isOptionAlreadySelected){
              const newSelection =  selectedOption.filter(item => item !== option);
              setSelectedOption(newSelection);
              userSelectedOption(newSelection);
             }else{
                setSelectedOption(prev => [...prev, option]);
                userSelectedOption([...selectedOption, option]);
             }
          }else{
                setSelectedOption([option]);
                 userSelectedOption(option);
          }
        } else {
              setSelectedOption([option])
              userSelectedOption(option)
        }
        setIsOptionSelected(true);
    };
      
    return quiz && (
      <div className="mt-10 p-5">
        <h2 className="font-medium text-lg text-center">{quiz?.question}{quiz?.text}{quiz?.questionText}</h2>
        <div className="grid grid-cols-2 gap-5 mt-6 ">
            {quiz?.options.map((option, index) => (
                <h2
                  onClick={() => handleOptionClick(option)}
                    key={index}
                    className={`w-full border rounded-full p-3 px-7 text-center text-lg cursor-pointer 
                        ${selectedOption.includes(option) ? 'bg-primary text-white hover:bg-primary' : 'hover:bg-gray-300'} 
                        ${isOptionSelected ? 'pointer-events-none opacity-70' : ''}`
                    }
                >
                {option}
              </h2>
            ))}
          </div>
      </div>
    );
}

export default QuizCardItem;