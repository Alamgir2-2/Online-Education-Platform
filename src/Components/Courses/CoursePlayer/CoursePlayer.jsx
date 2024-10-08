import React, { useState, useRef } from 'react';
import { FaLock, FaPlay } from 'react-icons/fa'; // Importing icons from react-icons
import { ToastContainer, toast } from 'react-toastify'; // Import toast for notifications
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import Footer from '../../Layout/Footer/Footer';

const milestones = [
  {
    title: 'Milestone 0: Welcome To Web Course',
    duration: '2 h 16 m',
    completed: '14/14',
    videos: [
      { title: 'Welcome to Complete Web Development Course', duration: '11 min', src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', description: 'An introduction to the complete web development course.', question: 'What is Web Development?', options: ['Creating websites', 'Cooking', 'Gardening', 'Painting'], answer: 0 },
      { title: 'Orientation Video', duration: '14 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Overview of the course structure and expectations.', question: 'What is the structure of this course?', options: ['HTML', 'CSS', 'JavaScript', 'All of the above'], answer: 3 },
    ],
  },
  {
    title: 'Milestone 1: HTML, CSS And Github As A Beginner',
    duration: '10 h 35 m',
    completed: '68/68',
    videos: [
      { title: 'Introduction to HTML', duration: '15 min', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', description: 'Learn the basics of HTML and its structure.', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of the above'], answer: 0 },
      { title: 'Introduction to CSS', duration: '12 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Understanding CSS and how to style HTML.', question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Colorful Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets'], answer: 0 },
    ],
  },

  {
    title: 'Milestone 0: Welcome To Web Course',
    duration: '2 h 16 m',
    completed: '14/14',
    videos: [
      { title: 'Welcome to Complete Web Development Course', duration: '11 min', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', description: 'An introduction to the complete web development course.', question: 'What is Web Development?', options: ['Creating websites', 'Cooking', 'Gardening', 'Painting'], answer: 0 },
      { title: 'Orientation Video', duration: '14 min', src: 'https://www.w3schools.com/html/mov_bbb.mp4', description: 'Overview of the course structure and expectations.', question: 'What is the structure of this course?', options: ['HTML', 'CSS', 'JavaScript', 'All of the above'], answer: 3 },
    ],
  },

];

const CoursePlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(milestones[0].videos[0]);
  const [videoDuration, setVideoDuration] = useState(0);
  const [expandedMilestone, setExpandedMilestone] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState(new Set()); // Track watched videos
  const [questionVisible, setQuestionVisible] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const videoRef = useRef(null);
  const [canProceed, setCanProceed] = useState(false);

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration); // Set the duration from the video element
    }
  };

  const toggleMilestone = (index) => {
    setExpandedMilestone(expandedMilestone === index ? null : index);
  };

  const handleAnswer = (index) => {
    setUserAnswer(index); // Store the user's answer
    if (index === selectedVideo.answer) {
      toast.success('Correct Answer'); // Show success toast
      // handleNextVideo(); // Unlock the next video immediately
      setCanProceed(true); // Enable the Next button
    } else {
      toast.error('Wrong Answer'); // Show error toast
      setCanProceed(false); // Keep the Next button disabled
    }
  };

  const handleNextVideo = () => {
    let newVideoIndex = currentVideoIndex + 1;
    let newMilestoneIndex = currentMilestoneIndex;

    // If current video is the last one in the current milestone
    if (newVideoIndex >= milestones[newMilestoneIndex].videos.length) {
      newMilestoneIndex++; // Move to the next milestone
      newVideoIndex = 0; // Start from the first video of the new milestone

      // Check if newMilestoneIndex exceeds milestones length
      if (newMilestoneIndex >= milestones.length) {
        newMilestoneIndex = milestones.length - 1; // Stay at the last milestone
        newVideoIndex = milestones[newMilestoneIndex].videos.length - 1; // Stay at the last video of the last milestone
      }

      // Expand the next milestone
      setExpandedMilestone(newMilestoneIndex);
    }

    setSelectedVideo(milestones[newMilestoneIndex].videos[newVideoIndex]);
    setCurrentVideoIndex(newVideoIndex);
    setCurrentMilestoneIndex(newMilestoneIndex);
    setQuestionVisible(false); // Reset question visibility
    setUserAnswer(null); // Reset user answer
  };

  const handlePreviousVideo = () => {
    let newVideoIndex = currentVideoIndex - 1;
    let newMilestoneIndex = currentMilestoneIndex;

    // If current video is the first one in the current milestone, move to the previous milestone
    if (newVideoIndex < 0) {
      newMilestoneIndex = (newMilestoneIndex - 1 + milestones.length) % milestones.length;
      newVideoIndex = milestones[newMilestoneIndex].videos.length - 1;
      setExpandedMilestone(newMilestoneIndex);
    }

    setSelectedVideo(milestones[newMilestoneIndex].videos[newVideoIndex]);
    setCurrentVideoIndex(newVideoIndex);
    setCurrentMilestoneIndex(newMilestoneIndex);
    setQuestionVisible(false); // Reset question visibility
    setUserAnswer(null); // Reset user answer
  };

  const handleVideoEnd = () => {
    // Add the video to the watched set when it ends
    const updatedWatchedVideos = new Set(watchedVideos);
    updatedWatchedVideos.add(selectedVideo.title);
    setWatchedVideos(updatedWatchedVideos);
    setQuestionVisible(true); // Show question when the video ends
  };



  return (
    <>
    <div className="flex mb-5 mt-20 gap-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
      {/* Left Section: Video Player */}
      <div className="w-3/4 flex-auto px-9">
        <div className="bg-black relative pb-[56.25%]">
          <video
            ref={videoRef}
            key={selectedVideo.src}
            controls
            className="absolute top-0 left-0 w-full h-full"
            onLoadedMetadata={handleVideoLoadedMetadata}
            onEnded={handleVideoEnd}
          >
            <source src={selectedVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Previous and Next Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handlePreviousVideo}
            className="bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
            disabled={currentVideoIndex === 0 && currentMilestoneIndex === 0} // Disable if first video
          >
            Previous
          </button>
          {/* <button
            onClick={handleNextVideo}
            className={`${
              canProceed ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400'
          } text-white font-bold py-2 px-4 rounded`}
            // className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={!watchedVideos.has(selectedVideo.title) || !canProceed} // Disable if current video isn't watched or canProceed is false
          >
            Next
          </button> */}

          <button
              onClick={handleNextVideo}
              className={`${watchedVideos.has(selectedVideo.title) && canProceed
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-gray-400'
                } text-white font-bold py-2 px-4 rounded`}
              disabled={!watchedVideos.has(selectedVideo.title) || !canProceed} // Disable if video not watched or answer incorrect
            >
              Next
            </button>

          {/* <button
            onClick={handleNextVideo}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={!watchedVideos.has(selectedVideo.title) || (currentMilestoneIndex === milestones.length - 1 && currentVideoIndex === milestones[currentMilestoneIndex].videos.length - 1)} // Disable if current video isn't watched or is the last video
          >
            Next
          </button> */}

        </div>

        {/* Video Title and Description */}
        <div className="mt-4 text-white">
          <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
          <p className="text-sm">{selectedVideo.description}</p>
        </div>

        {/* Question Section */}
        {questionVisible && (
          <div className="mt-4 text-white border border-gray-500 rounded-lg p-4">
            <h3 className="text-lg font-bold">{selectedVideo.question}</h3>
            <div className="flex flex-col mt-2">
              {selectedVideo.options.map((option, index) => (
                <button
                  key={index}
                  className={`p-2 rounded mt-1 ${userAnswer === index ? 'bg-gray-700' : 'bg-gray-600'} hover:bg-gray-500`}
                  onClick={() => handleAnswer(index)}
                // disabled={userAnswer !== null} // Disable after answering
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Section: Milestone List */}
      <div className="w-1/4 max-h-[600px] overflow-y-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 shadow-lg rounded">
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
                    className={`mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded flex justify-between items-center ${watchedVideos.has(video.title) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => {
                      if (watchedVideos.has(video.title)) {
                        setSelectedVideo(video);
                        setCurrentVideoIndex(videoIndex);
                        setCurrentMilestoneIndex(milestoneIndex);
                      }
                    }}
                  >
                    <span className="flex items-center">
                      {watchedVideos.has(video.title) ? <FaPlay className="mr-2 text-green-500" /> : <FaLock className="mr-2 text-red-500" />}
                      {video.title}
                    </span>
                    <span className="text-sm text-gray-400">{video.duration}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

     
      
      {/* Add toast container for notifications */}

      <ToastContainer
        // position="top-left" // Position the toast at the top left
        autoClose={3000} // Adjust duration as needed
        hideProgressBar={true} // Optional: Hide the progress bar
        closeOnClick
        draggable
        pauseOnHover
        style={{ marginTop: '30%', marginLeft: '20px', zIndex: 9999 }} // Adjust margin for vertical centering and left alignment
      />
    
    </div >
    <Footer/>
    </>
  );
};

export default CoursePlayer;





















// // CoursePlayer.jsx
// import React, { useState, useRef } from 'react';
// import { ToastContainer } from 'react-toastify';
// import Footer from '../../Layout/Footer/Footer';
// import Milestone from './Milestone'; // Import Milestone component
// import Quiz from './Quiz'; // Import Quiz component
// import WebcamTracking from './WebcamTracking'; // Import WebcamTracking component

// const CoursePlayer = () => {
//   const [milestones, setMilestones] = useState([
//     {
//       title: 'Milestone 1',
//       duration: '30 mins',
//       completed: '0/3 completed',
//       videos: [
//         {
//           title: 'Introduction to Course',
//           src: 'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with actual video link
//           duration: '10 mins',
//           question: 'What is the main topic of this course?',
//           options: ['A: Web Development', 'B: Data Science', 'C: Graphic Design'],
//           answer: 0, // Correct answer index
//         },
//         {
//           title: 'Chapter 1: Getting Started',
//           src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', // Replace with actual video link
//           duration: '10 mins',
//           question: 'What tools do you need to get started?',
//           options: ['A: IDE', 'B: Text Editor', 'C: Both A and B'],
//           answer: 2, // Correct answer index
//         },
//         {
//           title: 'Chapter 2: Advanced Techniques',
//           src: 'https://www.example.com/videos/video3.mp4', // Replace with actual video link
//           duration: '10 mins',
//           question: 'What is a key concept discussed in this chapter?',
//           options: ['A: API Development', 'B: UI Design', 'C: Database Management'],
//           answer: 1, // Correct answer index
//         },
//       ],
//     },
//     // Additional milestones can be added here
//     {
//       title: 'Milestone 2',
//       duration: '40 mins',
//       completed: '0/2 completed',
//       videos: [
//         {
//           title: 'Chapter 3: Frameworks',
//           src: 'https://www.example.com/videos/video4.mp4', // Replace with actual video link
//           duration: '20 mins',
//           question: 'Which framework is discussed?',
//           options: ['A: React', 'B: Vue', 'C: Angular'],
//           answer: 0, // Correct answer index
//         },
//         {
//           title: 'Chapter 4: Deployment',
//           src: 'https://www.example.com/videos/video5.mp4', // Replace with actual video link
//           duration: '20 mins',
//           question: 'What is necessary for deployment?',
//           options: ['A: Hosting', 'B: Domain', 'C: Both A and B'],
//           answer: 2, // Correct answer index
//         },
//       ],
//     },
//   ]);

//   const [expandedMilestone, setExpandedMilestone] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(milestones[0].videos[0]);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
//   const [watchedVideos, setWatchedVideos] = useState(new Set());
//   const [canProceed, setCanProceed] = useState(false);
//   const videoRef = useRef(null);
//   const [questionVisible, setQuestionVisible] = useState(false);

//   const toggleMilestone = (index) => {
//     setExpandedMilestone(expandedMilestone === index ? null : index);
//   };

//   const handleVideoEnd = () => {
//     setWatchedVideos((prev) => new Set(prev).add(selectedVideo.title));
//     setQuestionVisible(true);
//   };

//   const handleNextVideo = () => {
//     if (currentVideoIndex < milestones[currentMilestoneIndex].videos.length - 1) {
//       const nextVideoIndex = currentVideoIndex + 1;
//       setCurrentVideoIndex(nextVideoIndex);
//       setSelectedVideo(milestones[currentMilestoneIndex].videos[nextVideoIndex]);
//       setQuestionVisible(false);
//       setCanProceed(false);
//     } else if (currentMilestoneIndex < milestones.length - 1) {
//       const nextMilestoneIndex = currentMilestoneIndex + 1;
//       setCurrentMilestoneIndex(nextMilestoneIndex);
//       setCurrentVideoIndex(0);
//       setSelectedVideo(milestones[nextMilestoneIndex].videos[0]);
//       setQuestionVisible(false);
//       setCanProceed(false);
//     }
//   };

//   const handlePreviousVideo = () => {
//     if (currentVideoIndex > 0) {
//       const previousVideoIndex = currentVideoIndex - 1;
//       setCurrentVideoIndex(previousVideoIndex);
//       setSelectedVideo(milestones[currentMilestoneIndex].videos[previousVideoIndex]);
//       setQuestionVisible(false);
//     } else if (currentMilestoneIndex > 0) {
//       const previousMilestoneIndex = currentMilestoneIndex - 1;
//       setCurrentMilestoneIndex(previousMilestoneIndex);
//       setCurrentVideoIndex(milestones[previousMilestoneIndex].videos.length - 1);
//       setSelectedVideo(milestones[previousMilestoneIndex].videos[milestones[previousMilestoneIndex].videos.length - 1]);
//       setQuestionVisible(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex mb-5 mt-20 gap-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
//         {/* Left Section: Video Player */}
//         <div className="w-3/4 flex-auto px-9">
//           <div className="bg-black relative pb-[56.25%]">
//             <video
//               ref={videoRef}
//               key={selectedVideo.src}
//               controls
//               className="absolute top-0 left-0 w-full h-full"
//               onLoadedMetadata={() => {
//                 if (videoRef.current) {
//                   videoRef.current.play();
//                 }
//               }}
//               onEnded={handleVideoEnd}
//             >
//               <source src={selectedVideo.src} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* Previous and Next Buttons */}
//           <div className="flex justify-end gap-4 mt-4">
//             <button
//               onClick={handlePreviousVideo}
//               className="bg-purple-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
//               disabled={currentVideoIndex === 0 && currentMilestoneIndex === 0}
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNextVideo}
//               className={`${watchedVideos.has(selectedVideo.title) && canProceed
//                 ? 'bg-blue-600 hover:bg-blue-500'
//                 : 'bg-gray-400'
//               } text-white font-bold py-2 px-4 rounded`}
//               disabled={!watchedVideos.has(selectedVideo.title) || !canProceed}
//             >
//               Next
//             </button>
//           </div>

//           {/* Video Title and Description */}
//           <div className="mt-4 text-white">
//             <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
//             <p className="text-sm">{selectedVideo.duration}</p>
//           </div>

//           {/* Quiz Section */}
//           {questionVisible && (
//             <Quiz selectedVideo={selectedVideo} setCanProceed={setCanProceed} />
//           )}

//           {/* Webcam Tracking */}
//           <WebcamTracking videoRef={videoRef} isTracking={true} setIsTracking={setCanProceed} />
//         </div>

//         {/* Right Section: Milestone List */}
//         <div className="w-1/4 max-h-[600px] overflow-y-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 shadow-lg rounded">
//           {milestones.map((milestone, milestoneIndex) => (
//             <Milestone
//               key={milestoneIndex}
//               milestone={milestone}
//               index={milestoneIndex}
//               expandedMilestone={expandedMilestone}
//               toggleMilestone={toggleMilestone}
//               watchedVideos={watchedVideos}
//               setSelectedVideo={setSelectedVideo}
//               setCurrentVideoIndex={setCurrentVideoIndex}
//               setCurrentMilestoneIndex={setCurrentMilestoneIndex}
//             />
//           ))}
//         </div>

//         {/* Toast Container */}
//         <ToastContainer
//           position="top-left"
//           autoClose={3000}
//           hideProgressBar={true}
//           closeOnClick
//           draggable
//           pauseOnHover
//           style={{ marginTop: '30%', marginLeft: '20px', zIndex: 9999 }}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CoursePlayer;
