import React, { useState, useRef } from 'react';
import { FaLock, FaPlay } from 'react-icons/fa'; // Importing icons from react-icons

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
  const [videoDuration, setVideoDuration] = useState(0);
  const [expandedMilestone, setExpandedMilestone] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState(new Set()); // Track watched videos
  const videoRef = useRef(null);

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration); // Set the duration from the video element
    }
  };

  const toggleMilestone = (index) => {
    setExpandedMilestone(expandedMilestone === index ? null : index);
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
  };

  const handlePreviousVideo = () => {
    let newVideoIndex = currentVideoIndex - 1;
    let newMilestoneIndex = currentMilestoneIndex;

    // If current video is the first one in the current milestone, move to the previous milestone
    if (newVideoIndex < 0) {
      newMilestoneIndex = (newMilestoneIndex - 1 + milestones.length) % milestones.length;
      newVideoIndex = milestones[newMilestoneIndex].videos.length - 1;
    }

    setSelectedVideo(milestones[newMilestoneIndex].videos[newVideoIndex]);
    setCurrentVideoIndex(newVideoIndex);
    setCurrentMilestoneIndex(newMilestoneIndex);
  };

  const handleVideoEnd = () => {
    // Add the video to the watched set when it ends
    const updatedWatchedVideos = new Set(watchedVideos);
    updatedWatchedVideos.add(selectedVideo.title);
    setWatchedVideos(updatedWatchedVideos);
  };

  return (
    <div className="flex mt-20 gap-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
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
          >
            Previous
          </button>
          <button
            onClick={handleNextVideo}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled={!watchedVideos.has(selectedVideo.title)} // Disable if current video isn't watched
          >
            Next
          </button>
        </div>

        {/* Video Title and Description */}
        <div className="mt-4 text-white">
          <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
          <p className="text-sm">{selectedVideo.description}</p>
          {/* <p className="text-sm">Duration: {videoDuration ? `${Math.floor(videoDuration / 60)}:${Math.floor(videoDuration % 60).toString().padStart(2, '0')}` : 'Loading...'}</p> */}
        </div>
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
    </div>
  );
};

export default CoursePlayer;
