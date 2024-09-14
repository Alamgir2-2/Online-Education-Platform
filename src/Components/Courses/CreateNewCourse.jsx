import React, { useState } from 'react';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi'; // Added icons

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
    <div className=" p-10 mt-20">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Course Details Section */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Create a New Course</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-white">Course Title</label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="text-white">Course Description</label>
              <input
              type='text'
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter course description"
              />
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Videos</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white">Video Title</label>
              <input
                type="text"
                name="videoTitle"
                value={formData.videoTitle}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter video title"
              />
            </div>
            <div className="border-dashed border-4 border-teal-400 py-6 px-4 rounded-lg flex justify-center items-center text-white">
              <label className="cursor-pointer flex items-center space-x-3">
                <FiUploadCloud className="text-3xl" />
                <input
                  type="file"
                  name="videoFile"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <span>{formData.videoFile ? formData.videoFile.name : "Upload Video File"}</span>
              </label>
            </div>
            {formData.videoLength && (
              <p className="text-teal-400 mt-2">Video Length: {formData.videoLength}</p>
            )}
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Add Questions (Multiple Choice)</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white">Question</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter question"
              />
            </div>
            {formData.options.map((option, index) => (
              <div key={index}>
                <label className="text-white">Option {index + 1}</label>
                <input
                  type="text"
                  name={`option${index}`}
                  value={formData.options[index]}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = e.target.value;
                    setFormData({ ...formData, options: newOptions });
                  }}
                  className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}
            <div>
              <label className="text-white">Correct Option</label>
              <input
                type="text"
                name="correctOption"
                value={formData.correctOption}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter correct option"
              />
            </div>
          </div>
          <button
            onClick={handleAddQuestion}
            className="bg-teal-500 mt-4 p-3 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
          >
            Add Question
            <FiCheckCircle className="ml-2 inline" />
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="bg-teal-500 p-4 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200">
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
