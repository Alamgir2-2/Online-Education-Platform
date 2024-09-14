import React from 'react';
import { Link } from 'react-router-dom';
import algo from '../../../assets/CourseImage/algo.png'
import python from '../../../assets/CourseImage/python.png'
import cprogram from '../../../assets/CourseImage/cprogram.jpeg'
import man from '../../../assets/man.webp'
import Footer from '../../Layout/Footer/Footer';

// Dummy instructor data
const instructor = {
  id: 1,
  name: "Instructor One",
  rank: "Expert",
  views: 1200,
  email: "instructor1@example.com",
  courses: [
    { title: "Course A", description: "Description of Course A", image: [cprogram] },
    { title: "Course B", description: "Description of Course B", image: [python] },
    { title: "Course C", description: "Description of Course C", image: [algo] },
    { title: "Course D", description: "Description of Course D", image: [cprogram] },

    // Add more courses as needed
  ],
};

const InstructorProfilePage = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row py-20 px-4 lg:px-0">
      {/* Left Sidebar - Instructor Profile */}
      <div className="w-full lg:w-1/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4 flex-shrink-0">
        <div className="text-center mb-6">
          <img
            src={man}
            alt="Instructor"
            className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
          />
          <div className="mt-4">
            <h1 className="text-xl font-bold text-white">{instructor.name}</h1>
            <p className="text-gray-200">{instructor.email}</p>
            <p className="text-gray-300">Rank: {instructor.rank}</p>
            <p className="text-gray-300">Views: {instructor.views}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-white">Progress</h2>
        <p className="text-white text-center">Track your courses and student engagement.</p>
      </div>

      {/* Center Section - Dashboard and Courses */}
      <div className="flex-grow bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-2xl font-semibold mb-4 text-white">Dashboard</h2>
        <h3 className="text-xl font-semibold mb-2 text-white">Your Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {instructor.courses.map((course, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              <p className="text-gray-400">{course.description}</p>
              <Link to={`/courses/${index}`} className="text-blue-400 hover:underline mt-2 inline-block">View Course</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Other Options */}
      <div className="w-full lg:w-1/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-white">Dashboard Options</h2>
        <Link to="/manage-courses" className="block bg-green-300 p-4 rounded-lg mb-2 shadow hover:bg-green-500 transition duration-300">
          Manage Courses
        </Link>
        <Link to="/new-course" className="block bg-yellow-300 p-4 rounded-lg mb-2 shadow hover:bg-yellow-500 transition duration-300">
          Create New Course
        </Link>
        <Link to="/write-blog" className="block bg-purple-300 p-4 rounded-lg mb-2 shadow hover:bg-purple-500 transition duration-300">
          Write a Blog
        </Link>
        <Link to="/upload-video" className="block bg-red-300 p-4 rounded-lg mb-2 shadow hover:bg-red-500 transition duration-300">
          Upload Video
        </Link>
        <Link to="/track-progress" className="block bg-teal-300 p-4 rounded-lg shadow hover:bg-teal-500 transition duration-300">
          Track Student Progress
        </Link>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default InstructorProfilePage;
