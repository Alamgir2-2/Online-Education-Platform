import React, { useState } from 'react';
import './CoursePlayer.css';

const milestones = [
  {
    title: 'Milestone 0: Welcome To Web Course',
    duration: '2 h 16 m',
    completed: '14/14',
    modules: [
      {
        title: 'Module 0: Welcome Module',
        videos: [
          { title: 'Welcome to Complete Web Development Course', duration: '11 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ],
        duration: '0 h 11 m',
        completed: '1/1',
      },
      {
        title: 'Module 1: Orientation. How to get ready for this course',
        videos: [
          { title: 'Orientation Video', duration: '14 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ],
        duration: '2 h 5 m',
        completed: '13/13',
      },
    ],
  },
  {
    title: 'Milestone 1: HTML, CSS And Github As A Beginner',
    duration: '10 h 35 m',
    completed: '68/68',
    modules: [
      {
        title: 'Module 0: HTML Basics',
        videos: [
          { title: 'Introduction to HTML', duration: '15 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ],
        duration: '1 h 15 m',
        completed: '4/4',
      },
      {
        title: 'Module 1: CSS Basics',
        videos: [
          { title: 'Introduction to CSS', duration: '12 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ],
        duration: '1 h 30 m',
        completed: '6/6',
      },
    ],
  },
  // Add more milestones as needed
];

const CoursePlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(milestones[0].modules[0].videos[0] || {});
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleMilestone = (index) => {
    setExpandedMilestone(expandedMilestone === index ? null : index);
    if (expandedMilestone === index) {
      setExpandedModule(null);
    }
  };

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <div className="course-player-container flex pt-20">
      <div className="video-player flex-auto py-0">
        <div className="video-container bg-black">
          <video controls width="100%" height="auto">
            <source src={selectedVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!selectedVideo.src && <div className="video-placeholder">Select a video to play</div>}
        </div>
      </div>
      <div className="module-list w-80 bg-gray-900 text-white p-4 overflow-y-auto rounded-2xl">
        {milestones.map((milestone, milestoneIndex) => (
          <div key={milestoneIndex} className="milestone mb-4">
            <div 
              className="milestone-header flex justify-between items-center mb-2 cursor-pointer rounded-xl"
              onClick={() => toggleMilestone(milestoneIndex)}
            >
              <h3 className="text-lg font-bold">{milestone.title}</h3>
              <span className="text-sm">{milestone.duration} • {milestone.completed}</span>
            </div>
            {expandedMilestone === milestoneIndex && (
              <div className="modules">
                {milestone.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="module mb-4">
                    <div 
                      className="module-header flex justify-between items-center mb-2 cursor-pointer rounded-xl p-2"
                      onClick={() => toggleModule(moduleIndex)}
                    >
                      <h4 className="text-md font-semibold px-2">{module.title}</h4>
                      <span className="text-sm">{module.duration} • {module.completed}</span>
                    </div>
                    {expandedModule === moduleIndex && (
                      <ul>
                        {module.videos.map((video, videoIndex) => (
                          <li
                            key={videoIndex}
                            className="video-item mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-between items-center"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <span>{video.title}</span>
                            <span className="text-sm text-gray-400">{video.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlayer;
