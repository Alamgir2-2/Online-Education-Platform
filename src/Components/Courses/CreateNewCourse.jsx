import React, { useState } from 'react';
import { FiUploadCloud, FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Added FiXCircle for close icon

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    courseTitle: '',
    thumbnail: null, // Added thumbnail to state
    description: '',
    milestones: [
      {
        title: '',
        videos: [],
      },
    ],
  });

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle thumbnail change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, thumbnail: file });
  };

  // Handle milestone input change
  const handleMilestoneChange = (index, e) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index][e.target.name] = e.target.value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  // Add new milestone
  const handleAddMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: '', videos: [] }],
    });
  };

  // Remove milestone
  const handleRemoveMilestone = (index) => {
    const newMilestones = [...formData.milestones];
    newMilestones.splice(index, 1);
    setFormData({ ...formData, milestones: newMilestones });
  };

  // Add video to a milestone
  const handleAddVideo = (index) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index].videos.push({ title: '', file: null, questions: [] });
    setFormData({ ...formData, milestones: newMilestones });
  };

  // Remove video from a milestone
  const handleRemoveVideo = (milestoneIndex, videoIndex) => {
    const newMilestones = [...formData.milestones];
    newMilestones[milestoneIndex].videos.splice(videoIndex, 1);
    setFormData({ ...formData, milestones: newMilestones });
  };

// Remove question from a milestone video
const handleRemoveQuestion = (milestoneIndex, videoIndex, questionIndex) => {
  const newMilestones = [...formData.milestones];
  newMilestones[milestoneIndex].videos[videoIndex].questions.splice(questionIndex, 1);
  setFormData({ ...formData, milestones: newMilestones });
};

  

  const handleVideoTitleChange = (milestoneIndex, videoIndex, e) => {
    const newMilestones = [...formData.milestones];
    newMilestones[milestoneIndex].videos[videoIndex].title = e.target.value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  const handleVideoFileChange = (milestoneIndex, videoIndex, e) => {
    const file = e.target.files[0];
    const newMilestones = [...formData.milestones];
    newMilestones[milestoneIndex].videos[videoIndex].file = file;
    setFormData({ ...formData, milestones: newMilestones });
  };

  const handleAddQuestion = (milestoneIndex, videoIndex) => {
    const newMilestones = [...formData.milestones];
    newMilestones[milestoneIndex].videos[videoIndex].questions.push({
      question: '',
      options: ['', '', '', ''],
      correctOption: '',
    });
    setFormData({ ...formData, milestones: newMilestones });
  };

  const handleQuestionChange = (milestoneIndex, videoIndex, questionIndex, e) => {
    const newMilestones = [...formData.milestones];
    newMilestones[milestoneIndex].videos[videoIndex].questions[questionIndex][e.target.name] = e.target.value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  const handleOptionChange = (milestoneIndex, videoIndex, questionIndex, optionIndex, e) => {
    const newMilestones = [...formData.milestones];
    newMilestones[milestoneIndex].videos[videoIndex].questions[questionIndex].options[optionIndex] = e.target.value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  return (
    <div className="p-10 mt-20">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Course Details Section */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Create a New Course</h2>
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

          {/* Course Thumbnail Section */}
          <div className="mt-6">
            <label className="text-white">Course Thumbnail</label>
            <div className="border-dashed border-4 border-teal-400 py-6 px-4 rounded-lg mt-2 text-white">
              <label className="cursor-pointer flex items-center space-x-3">
                <FiUploadCloud className="text-3xl" />
                <input
                  type="file"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
                <span>{formData.thumbnail ? formData.thumbnail.name : 'Upload Thumbnail'}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Milestones and Videos */}
        {formData.milestones.map((milestone, milestoneIndex) => (
          <div key={milestoneIndex} className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
            {/* Close button for Milestone */}
            <button
              onClick={() => handleRemoveMilestone(milestoneIndex)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <FiXCircle className="text-2xl" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-4">Milestone {milestoneIndex + 1}</h3>
            <div>
              <label className="text-white">Milestone Title</label>
              <input
                type="text"
                name="title"
                value={milestone.title}
                onChange={(e) => handleMilestoneChange(milestoneIndex, e)}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter milestone title"
              />
            </div>

            {milestone.videos.map((video, videoIndex) => (
              <div key={videoIndex} className="relative mt-4 bg-white bg-opacity-10 p-4 rounded-lg">
                {/* Close button for Video */}
                <button
                  onClick={() => handleRemoveVideo(milestoneIndex, videoIndex)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FiXCircle className="text-xl" />
                </button>

                <label className="text-white">Video Title</label>
                <input
                  type="text"
                  name="videoTitle"
                  value={video.title}
                  onChange={(e) => handleVideoTitleChange(milestoneIndex, videoIndex, e)}
                  className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter video title"
                />
                <div className="border-dashed border-4 border-teal-400 py-6 px-4 rounded-lg mt-2 text-white">
                  <label className="cursor-pointer flex items-center space-x-3">
                    <FiUploadCloud className="text-3xl" />
                    <input
                      type="file"
                      onChange={(e) => handleVideoFileChange(milestoneIndex, videoIndex, e)}
                      className="hidden"
                    />
                    <span>{video.file ? video.file.name : 'Upload Video'}</span>
                  </label>
                </div>


                {/* Questions Section for Each Video */}
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Add Questions for this Video</h4>

                  {video.questions.map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="mb-4 border border-teal-500 p-4 rounded-lg relative"
                    >

                      <label className="text-white">Question {questionIndex + 1}</label>
                      {/* FiXCircle button for removing the question */}
                      <button
                        onClick={() => handleRemoveQuestion(milestoneIndex, videoIndex, questionIndex)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <FiXCircle className="text-xl" />
                      </button>
                      <input
                        type="text"
                        name="question"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(milestoneIndex, videoIndex, questionIndex, e)}
                        className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter question"
                      />

                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mt-2">
                          <label className="text-white">Option {optionIndex + 1}</label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(milestoneIndex, videoIndex, questionIndex, optionIndex, e)}
                            className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder={`Enter option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}

                      {/* Right Answer Field */}
                      <div className="mt-4">
                        <label className="text-white">Correct Answer</label>
                        <input
                          type="text"
                          name="correctOption"
                          value={question.correctOption}
                          onChange={(e) => handleQuestionChange(milestoneIndex, videoIndex, questionIndex, e)}
                          className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter the correct answer"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddQuestion(milestoneIndex, videoIndex)}
                    className="bg-teal-500 mt-4 p-3 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
                  >
                    Add Question <FiCheckCircle className="ml-2 inline" />
                  </button>
                </div>


              </div>
            ))}
            <button
              onClick={() => handleAddVideo(milestoneIndex)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg shadow-sm hover:bg-teal-600 focus:outline-none"
            >
              Add Video
            </button>
          </div>
        ))}
        <button
          onClick={handleAddMilestone}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg shadow-sm hover:bg-teal-600 focus:outline-none"
        >
          Add Milestone
        </button>
      </div>
    </div>
  );
};

export default CreateCoursePage;
