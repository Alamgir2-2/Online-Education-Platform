import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
        <h3 className="text-lg text-black font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-4 text-black">Are you sure you want to delete this course?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Manage Courses Page Component
const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Course 1', description: 'Description of Course 1' },
    { id: 2, title: 'Course 2', description: 'Description of Course 2' },
    { id: 3, title: 'Course 3', description: 'Description of Course 3' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleDeleteCourse = (id) => {
    setCourseToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedCourses = courses.filter(course => course.id !== courseToDelete);
    setCourses(updatedCourses);
    setIsModalOpen(false);
    setCourseToDelete(null);
  };

  const navigate = useNavigate();

  const handleAddCourse = () => {
    // Logic to add a new course, possibly opening a modal or redirecting to a new page
    // console.log('Add a new course');
    navigate('/new-course')
  };

  return (
    <div className="p-10 mt-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex justify-between items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white">Manage Courses</h2>
          <button
            onClick={handleAddCourse}
            className="flex items-center bg-teal-500 p-2 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
          >
            <FiPlusCircle className="mr-2" />
            Add New Course
          </button>
        </div>

        {/* Courses List */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          {courses.map(course => (
            <div key={course.id} className="flex justify-between items-center p-4 mb-4 bg-white bg-opacity-20 rounded-lg">
              <div>
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
                <p className="text-white">{course.description}</p>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => navigate(`/edit-course/${course.id}`)} className="text-teal-500 hover:text-teal-600">
                  <FiEdit className="text-xl" />
                </button>

                <button onClick={() => handleDeleteCourse(course.id)} className="text-red-500 hover:text-red-600">
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default ManageCoursesPage;
