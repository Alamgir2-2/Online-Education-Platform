// src/components/Milestone.jsx
import React from 'react';

const Milestone = ({ milestone, index, expandedMilestone, toggleMilestone, watchedVideos, setSelectedVideo, setCurrentVideoIndex, setCurrentMilestoneIndex }) => {
  return (
    <div className="milestone">
      <h3 onClick={() => toggleMilestone(index)} className="cursor-pointer">
        {milestone.title} - {milestone.duration} ({milestone.completed})
      </h3>
      {expandedMilestone === index && (
        <ul>
          {milestone.videos.map((video, videoIndex) => (
            <li
              key={videoIndex}
              onClick={() => {
                setSelectedVideo(video);
                setCurrentVideoIndex(videoIndex);
                setCurrentMilestoneIndex(index);
              }}
              className={`cursor-pointer ${watchedVideos.has(video.title) ? 'text-gray-500' : 'text-black'}`}
            >
              {video.title} - {video.duration}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Milestone;
