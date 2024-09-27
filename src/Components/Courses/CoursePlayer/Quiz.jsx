import React, { useState } from 'react';

const Quiz = ({ question, options, correctAnswer, onCorrectAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowResult(true);
    
    if (option === correctAnswer) {
      setMessage('Correct Answer!');
      onCorrectAnswer(true);
    } else {
      setMessage('Wrong Answer!');
    }
    
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded shadow-md mt-4">
      <h2 className="text-lg font-bold">{question}</h2>
      <ul className="mt-2">
        {options.map((option, index) => (
          <li
            key={index}
            className={`p-2 cursor-pointer rounded hover:bg-gray-600 ${
              showResult && option === selectedOption ? 'bg-red-500 text-white' : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      {showToast && (
        <div className="fixed top-4 right-4 p-4 bg-gray-800 text-white rounded shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default Quiz;
