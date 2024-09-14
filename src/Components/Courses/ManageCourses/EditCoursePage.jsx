import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCoursePage = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  // Sample courses data
  const initialCourses = [
    { id: 1, title: 'Course 1', description: 'Description of Course 1' },
    { id: 2, title: 'Course 2', description: 'Description of Course 2' },
    { id: 3, title: 'Course 3', description: 'Description of Course 3' },
  ];

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    // Find the course to edit based on the ID
    const courseToEdit = initialCourses.find((course) => course.id === parseInt(id));
    if (courseToEdit) {
      setCourseData(courseToEdit);
    }
  }, [id]);

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    // Logic to save changes goes here
    console.log('Course updated:', courseData);
    // Redirect back to manage courses page
    navigate('/manage-courses');
  };

  return (
    <div className="p-10 mt-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Edit Course</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-white">Course Title</label>
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="text-white">Course Description</label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter course description"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveChanges}
              className="bg-teal-500 p-3 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
