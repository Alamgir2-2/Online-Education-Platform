// import { useState } from 'react';

// const CourseUploadForm = () => {
//   const [courseName, setCourseName] = useState('');
//   const [courseDescription, setCourseDescription] = useState('');
//   const [thumbnail, setThumbnail] = useState(null);
//   const [milestoneTitle, setMilestoneTitle] = useState('');
//   const [videoTitle, setVideoTitle] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [question, setQuestion] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [answer, setAnswer] = useState('');

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create formData for testing and logging data in console
//     const formData = {
//       courseName,
//       courseDescription,
//       thumbnail: thumbnail ? thumbnail.name : null,  // Log file name if present
//       milestoneTitle,
//       videoTitle,
//       videoFile: videoFile ? videoFile.name : null,  // Log file name if present
//       question,
//       options,
//       answer
//     };

//     // Log form data to the console
//     console.log('Form Data Submitted:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 mt-40">
//       <h2 className="text-xl font-bold mb-4">Course Details</h2>

//       {/* Course Name */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Course Name</label>
//         <input
//           type="text"
//           value={courseName}
//           onChange={(e) => setCourseName(e.target.value)}
//           className="w-full border px-3 py-2 rounded-lg text-black"
//           required
//         />
//       </div>

//       {/* Course Description */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Course Description</label>
//         <textarea
//           value={courseDescription}
//           onChange={(e) => setCourseDescription(e.target.value)}
//           className="w-full border px-3 py-2 rounded-lg text-black"
//           required
//         />
//       </div>

//       {/* Thumbnail */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Thumbnail</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setThumbnail(e.target.files[0])}
//           className="w-full border px-3 py-2 rounded-lg text-white"
//         />
//       </div>

//       <h2 className="text-xl font-bold mb-4">Milestone & Video Details</h2>

//       {/* Milestone Title */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Milestone Title</label>
//         <input
//           type="text"
//           value={milestoneTitle}
//           onChange={(e) => setMilestoneTitle(e.target.value)}
//           className="w-full border px-3 py-2 rounded-lg text-black"
//           required
//         />
//       </div>

//       {/* Video Title */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Video Title</label>
//         <input
//           type="text"
//           value={videoTitle}
//           onChange={(e) => setVideoTitle(e.target.value)}
//           className="w-full border px-3 py-2 rounded-lg text-black"
//           required
//         />
//       </div>

//       {/* Video File */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Upload Video</label>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//           className="w-full border px-3 py-2 rounded-lg text-white"
//         />
//       </div>

//       <h2 className="text-xl font-bold mb-4">Question & Answer</h2>

//       {/* Question */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Question</label>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="w-full border px-3 py-2 rounded-lg text-black"
//           required
//         />
//       </div>

//       {/* Options */}
//       <div className="mb-4">
//         <label className="block text-md font-medium mb-1">Options</label>
//         {options.map((option, index) => (
//           <input
//             key={index}
//             type="text"
//             value={option}
//             onChange={(e) => handleOptionChange(index, e.target.value)}
//             placeholder={`Option ${index + 1}`}
//             className="w-full border px-3 py-2 rounded-lg mb-2 text-black"
//             required
//           />
//         ))}
//       </div>

//       {/* Answer */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">Answer</label>
//         <input
//           type="text"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//           className="w-full border px-3 py-2 rounded-lg text-black"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
//       >
//         Upload Course
//       </button>
//     </form>
//   );
// };

// export default CourseUploadForm;




import { useState } from 'react';

const CourseUploadForm = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [milestones, setMilestones] = useState([{ title: '', videos: [{ videoTitle: '', question: '', options: ['', '', '', ''], answer: '' }] }]);
  
  const handleOptionChange = (milestoneIndex, videoIndex, optionIndex, value) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].videos[videoIndex].options[optionIndex] = value;
    setMilestones(newMilestones);
  };

  const handleAddVideo = (milestoneIndex) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].videos.push({ videoTitle: '', question: '', options: ['', '', '', ''], answer: '' });
    setMilestones(newMilestones);
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: '', videos: [{ videoTitle: '', question: '', options: ['', '', '', ''], answer: '' }] }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create formData for the API request
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('courseDescription', courseDescription);
    
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    milestones.forEach((milestone, milestoneIndex) => {
      formData.append(`milestones[${milestoneIndex}].title`, milestone.title);
      
      milestone.videos.forEach((video, videoIndex) => {
        formData.append(`milestones[${milestoneIndex}].videos[${videoIndex}].videoTitle`, video.videoTitle);
        formData.append(`milestones[${milestoneIndex}].videos[${videoIndex}].question`, video.question);
        formData.append(`milestones[${milestoneIndex}].videos[${videoIndex}].answer`, video.answer);
        video.options.forEach((option, optionIndex) => {
          formData.append(`milestones[${milestoneIndex}].videos[${videoIndex}].options[${optionIndex}]`, option);
        });
      });
    });

    // Send the data to your backend API
    const response = await fetch('http://localhost:5000/api/upload-course', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Course uploaded successfully!');
      // You can also reset the form or show a success message here
    } else {
      console.error('Failed to upload course.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 mt-40">
      <h2 className="text-xl font-bold mb-4">Course Details</h2>

      {/* Course Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Course Name</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-black"
          required
        />
      </div>

      {/* Course Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Course Description</label>
        <textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-black"
          required
        />
      </div>

      {/* Thumbnail */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full border px-3 py-2 rounded-lg text-white"
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Milestones</h2>

      {milestones.map((milestone, milestoneIndex) => (
        <div key={milestoneIndex} className="mb-4">
          {/* Milestone Title */}
          <label className="block text-sm font-medium mb-1">Milestone Title</label>
          <input
            type="text"
            value={milestone.title}
            onChange={(e) => {
              const newMilestones = [...milestones];
              newMilestones[milestoneIndex].title = e.target.value;
              setMilestones(newMilestones);
            }}
            className="w-full border px-3 py-2 rounded-lg text-black"
            required
          />

          {/* Videos */}
          <h3 className="text-lg font-bold mb-2">Videos</h3>
          {milestone.videos.map((video, videoIndex) => (
            <div key={videoIndex} className="mb-4">
              {/* Video Title */}
              <label className="block text-sm font-medium mb-1">Video Title</label>
              <input
                type="text"
                value={video.videoTitle}
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[milestoneIndex].videos[videoIndex].videoTitle = e.target.value;
                  setMilestones(newMilestones);
                }}
                className="w-full border px-3 py-2 rounded-lg text-black"
                required
              />

              {/* Upload Video */}
              <label className="block text-sm font-medium mb-1">Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[milestoneIndex].videos[videoIndex].videoFile = e.target.files[0];
                  setMilestones(newMilestones);
                }}
                className="w-full border px-3 py-2 rounded-lg text-white"
              />

              {/* Question */}
              <label className="block text-sm font-medium mb-1">Question</label>
              <input
                type="text"
                value={video.question}
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[milestoneIndex].videos[videoIndex].question = e.target.value;
                  setMilestones(newMilestones);
                }}
                className="w-full border px-3 py-2 rounded-lg text-black"
                required
              />

              {/* Options */}
              <label className="block text-md font-medium mb-1">Options</label>
              {video.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(milestoneIndex, videoIndex, optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                  className="w-full border px-3 py-2 rounded-lg mb-2 text-black"
                  required
                />
              ))}

              {/* Answer */}
              <label className="block text-sm font-medium mb-1">Answer</label>
              <input
                type="text"
                value={video.answer}
                onChange={(e) => {
                  const newMilestones = [...milestones];
                  newMilestones[milestoneIndex].videos[videoIndex].answer = e.target.value;
                  setMilestones(newMilestones);
                }}
                className="w-full border px-3 py-2 rounded-lg text-black"
                required
              />
            </div>
          ))}
          
          {/* Button to Add Video */}
          <button
            type="button"
            onClick={() => handleAddVideo(milestoneIndex)}
            className="text-blue-500"
          >
            Add Video
          </button>
        </div>
      ))}

      {/* Button to Add Milestone */}
      <button
        type="button"
        onClick={handleAddMilestone}
        className="text-blue-500 mb-4"
      >
        Add Milestone
      </button>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Upload Course
      </button>
    </form>
  );
};

export default CourseUploadForm;
