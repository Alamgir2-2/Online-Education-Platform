import React, { useState } from 'react';

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    courseTitle: '',
    description: '',
    videos: [],
    videoTitle: '',
    videoFile: null,
    videoLength: '',
    questions: [],
    question: '',
    options: ['', '', '', ''],
    correctOption: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoLength = '10 mins'; // Video length calculation logic here
      setFormData({
        ...formData,
        videoFile: file,
        videoLength,
      });
    }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: formData.question, options: formData.options, correctOption: formData.correctOption }],
      question: '',
      options: ['', '', '', ''],
      correctOption: '',
    });
  };

  return (
    <div className="bg-gray-700 mt-20 p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Course Details Section */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Create a New Course</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-gray-300">Course Title</label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="text-gray-300">Course Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course description"
              />
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Videos</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-300">Video Title</label>
              <input
                type="text"
                name="videoTitle"
                value={formData.videoTitle}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter video title"
              />
            </div>
            <div>
              <label className="text-gray-300">Upload Video</label>
              <input
                type="file"
                name="videoFile"
                onChange={handleVideoUpload}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm"
              />
              {formData.videoLength && (
                <p className="text-gray-400 mt-2">Video Length: {formData.videoLength}</p>
              )}
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Add Questions (Multiple Choice)</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-300">Question</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question"
              />
            </div>
            {formData.options.map((option, index) => (
              <div key={index}>
                <label className="text-gray-300">Option {index + 1}</label>
                <input
                  type="text"
                  name={`option${index}`}
                  value={formData.options[index]}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = e.target.value;
                    setFormData({ ...formData, options: newOptions });
                  }}
                  className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}
            <div>
              <label className="text-gray-300">Correct Option</label>
              <input
                type="text"
                name="correctOption"
                value={formData.correctOption}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-3 bg-gray-900 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter correct option"
                />
              </div>
            </div>
            <button
              onClick={handleAddQuestion}
              className="bg-blue-500 mt-4 p-3 rounded-lg text-white shadow-md hover:bg-blue-600 transition duration-200"
            >
              Add Questionn
            </button>
          </div>
  
          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="bg-green-500 p-4 rounded-lg text-white shadow-md hover:bg-green-600 transition duration-200">
              Create Course
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateCoursePage;
  