import React, { useState } from 'react';

const milestones = [
  {
    title: 'Milestone 0: Welcome To Web Course',
    duration: '2 h 16 m',
    completed: '14/14',
    videos: [
      { title: 'Welcome to Complete Web Development Course', duration: '11 min', src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', description: 'An introduction to the complete web development course.' },
      { title: 'Orientation Video', duration: '14 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Overview of the course structure and expectations.' },
    ],
  },
  {
    title: 'Milestone 1: HTML, CSS And Github As A Beginner',
    duration: '10 h 35 m',
    completed: '68/68',
    videos: [
      { title: 'Introduction to HTML', duration: '15 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Learn the basics of HTML and its structure.' },
      { title: 'Introduction to CSS', duration: '12 min', src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', description: 'Understanding CSS and how to style HTML.' },
    ],
  },
];

const CoursePlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(milestones[0].videos[0]);
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

  const toggleMilestone = (index) => {
    setExpandedMilestone(expandedMilestone === index ? null : index);
  };

  const handleNextVideo = () => {
    let newVideoIndex = currentVideoIndex + 1;
    let newMilestoneIndex = currentMilestoneIndex;

    if (newVideoIndex >= milestones[newMilestoneIndex].videos.length) {
      newMilestoneIndex = (newMilestoneIndex + 1) % milestones.length;
      newVideoIndex = 0;
    }

    setSelectedVideo(milestones[newMilestoneIndex].videos[newVideoIndex]);
    setCurrentVideoIndex(newVideoIndex);
    setCurrentMilestoneIndex(newMilestoneIndex);
  };

  const handlePreviousVideo = () => {
    let newVideoIndex = currentVideoIndex - 1;
    let newMilestoneIndex = currentMilestoneIndex;

    if (newVideoIndex < 0) {
      newMilestoneIndex = (newMilestoneIndex - 1 + milestones.length) % milestones.length;
      newVideoIndex = milestones[newMilestoneIndex].videos.length - 1;
    }

    setSelectedVideo(milestones[newMilestoneIndex].videos[newVideoIndex]);
    setCurrentVideoIndex(newVideoIndex);
    setCurrentMilestoneIndex(newMilestoneIndex);
  };

  return (
    <div className="flex flex-col md:flex-row mt-20 gap-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
      {/* Video Player Section */}
      <div className="w-full md:w-3/4 flex-auto px-9">
        <div className="bg-black relative pb-[56.25%]">
          <video key={selectedVideo.src} controls className="absolute top-0 left-0 w-full h-full">
            <source src={selectedVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Previous and Next Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handlePreviousVideo}
            className="bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNextVideo}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>

        {/* Video Title and Description */}
        <div className="mt-4 text-white">
          <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
          <p className="text-sm">{selectedVideo.description}</p>
        </div>
      </div>

      {/* Milestone List Section */}
      <div className="w-full md:w-1/4 max-h-[600px] overflow-y-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 shadow-lg rounded mt-4 md:mt-0">
        {milestones.map((milestone, milestoneIndex) => (
          <div key={milestoneIndex} className="mb-4">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer rounded-xl bg-white bg-opacity-20 p-2"
              onClick={() => toggleMilestone(milestoneIndex)}
            >
              <h3 className="text-lg font-bold">{milestone.title}</h3>
              <span className="text-sm">{milestone.duration} • {milestone.completed}</span>
            </div>
            {expandedMilestone === milestoneIndex && (
              <ul>
                {milestone.videos.map((video, videoIndex) => (
                  <li
                    key={videoIndex}
                    className="mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded flex justify-between items-center"
                    onClick={() => {
                      setSelectedVideo(video);
                      setCurrentVideoIndex(videoIndex);
                      setCurrentMilestoneIndex(milestoneIndex);
                    }}
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
    </div>
  );
};

export default CoursePlayer;






































// import React, { useState } from 'react';
// import './CoursePlayer.css';

// const milestones = [
//   {
//     title: 'Milestone 0: Welcome To Web Course',
//     duration: '2 h 16 m',
//     completed: '14/14',
//     modules: [
//       {
//         title: 'Module 0: Welcome Module',
//         videos: [
//           { title: 'Welcome to Complete Web Development Course', duration: '11 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
//         ],
//         duration: '0 h 11 m',
//         completed: '1/1',
//       },
//       {
//         title: 'Module 1: Orientation. How to get ready for this course',
//         videos: [
//           { title: 'Orientation Video', duration: '14 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
//         ],
//         duration: '2 h 5 m',
//         completed: '13/13',
//       },
//     ],
//   },
//   {
//     title: 'Milestone 1: HTML, CSS And Github As A Beginner',
//     duration: '10 h 35 m',
//     completed: '68/68',
//     modules: [
//       {
//         title: 'Module 0: HTML Basics',
//         videos: [
//           { title: 'Introduction to HTML', duration: '15 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
//         ],
//         duration: '1 h 15 m',
//         completed: '4/4',
//       },
//       {
//         title: 'Module 1: CSS Basics',
//         videos: [
//           { title: 'Introduction to CSS', duration: '12 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
//         ],
//         duration: '1 h 30 m',
//         completed: '6/6',
//       },
//     ],
//   },
//   // Add more milestones as needed
// ];

// const CoursePlayer = () => {
//   const [selectedVideo, setSelectedVideo] = useState(milestones[0].modules[0].videos[0] || {});
//   const [expandedMilestone, setExpandedMilestone] = useState(null);
//   const [expandedModule, setExpandedModule] = useState(null);

//   const toggleMilestone = (index) => {
//     setExpandedMilestone(expandedMilestone === index ? null : index);
//     if (expandedMilestone === index) {
//       setExpandedModule(null);
//     }
//   };

//   const toggleModule = (index) => {
//     setExpandedModule(expandedModule === index ? null : index);
//   };

//   return (
//     <div className="course-player-container flex pt-20">
//       <div className="video-player flex-auto py-0">
//         <div className="video-container bg-black">
//           <video controls width="100%" height="auto">
//             <source src={selectedVideo.src} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {!selectedVideo.src && <div className="video-placeholder">Select a video to play</div>}
//         </div>
//       </div>
//       <div className="module-list w-80 bg-gray-900 text-white p-4 overflow-y-auto rounded-2xl">
//         {milestones.map((milestone, milestoneIndex) => (
//           <div key={milestoneIndex} className="milestone mb-4">
//             <div 
//               className="milestone-header flex justify-between items-center mb-2 cursor-pointer rounded-xl"
//               onClick={() => toggleMilestone(milestoneIndex)}
//             >
//               <h3 className="text-lg font-bold">{milestone.title}</h3>
//               <span className="text-sm">{milestone.duration} • {milestone.completed}</span>
//             </div>
//             {expandedMilestone === milestoneIndex && (
//               <div className="modules">
//                 {milestone.modules.map((module, moduleIndex) => (
//                   <div key={moduleIndex} className="module mb-4">
//                     <div 
//                       className="module-header flex justify-between items-center mb-2 cursor-pointer rounded-xl p-2"
//                       onClick={() => toggleModule(moduleIndex)}
//                     >
//                       <h4 className="text-md font-semibold px-2">{module.title}</h4>
//                       <span className="text-sm">{module.duration} • {module.completed}</span>
//                     </div>
//                     {expandedModule === moduleIndex && (
//                       <ul>
//                         {module.videos.map((video, videoIndex) => (
//                           <li
//                             key={videoIndex}
//                             className="video-item mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-between items-center"
//                             onClick={() => setSelectedVideo(video)}
//                           >
//                             <span>{video.title}</span>
//                             <span className="text-sm text-gray-400">{video.duration}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursePlayer;
