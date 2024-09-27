// Milestone.jsx
import React from 'react';
import { FaLock, FaPlay } from 'react-icons/fa';

const Milestone = ({
  milestone,
  milestoneIndex,
  expandedMilestone,
  toggleMilestone,
  watchedVideos,
  setSelectedVideo,
  setCurrentVideoIndex,
  setCurrentMilestoneIndex,
}) => {
  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center mb-2 cursor-pointer rounded-xl bg-white bg-opacity-20 p-2"
        onClick={() => toggleMilestone(milestoneIndex)}
      >
        <h3 className="text-lg font-bold">{milestone.title}</h3>
        <span className="text-sm">
          {milestone.duration} • {milestone.completed}
        </span>
      </div>
      {expandedMilestone === milestoneIndex && (
        <ul>
          {milestone.videos.map((video, videoIndex) => (
            <li
              key={videoIndex}
              className={`mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded flex justify-between items-center ${
                watchedVideos.has(video.title) ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              onClick={() => {
                if (watchedVideos.has(video.title)) {
                  setSelectedVideo(video);
                  setCurrentVideoIndex(videoIndex);
                  setCurrentMilestoneIndex(milestoneIndex);
                }
              }}
            >
              <span className="flex items-center">
                {watchedVideos.has(video.title) ? (
                  <FaPlay className="mr-2 text-green-500" />
                ) : (
                  <FaLock className="mr-2 text-red-500" />
                )}
                {video.title}
              </span>
              <span className="text-sm text-gray-400">{video.duration}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Milestone;

