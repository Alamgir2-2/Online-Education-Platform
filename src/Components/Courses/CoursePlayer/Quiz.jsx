// src/components/Quiz.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Quiz = ({ selectedVideo, setCanProceed }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === selectedVideo.answer) {
      toast.success('Correct Answer');
      setCanProceed(true);
    } else {
      toast.error('Wrong Answer');
      setCanProceed(false);
    }
  };

  return (
    <div className="quiz">
      <h4>{selectedVideo.question}</h4>
      <div>
        {selectedVideo.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionChange(index)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </div>
  );
};

export default Quiz;
