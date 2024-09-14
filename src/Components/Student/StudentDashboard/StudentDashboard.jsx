import React from 'react';
import { Link } from 'react-router-dom';
import algo from '../../../assets/CourseImage/algo.png'
import python from '../../../assets/CourseImage/python.png'
import cprogram from '../../../assets/CourseImage/cprogram.jpeg'
import Footer from '../../Layout/Footer/Footer';

// Dummy student data
const student = {
  id: 1,
  name: "Student One",
  email: "student1@example.com",
  progress: 65, // in percentage
  enrolledCourses: [
    { title: "Course A", description: "Learn the basics of Course A", image: [algo] },
    { title: "Course B", description: "Learn the basics of Course B", image: [python] },
    { title: "Course C", description: "Learn the basics of Course C", image: [cprogram] },
    { title: "Course A", description: "Learn the basics of Course A", image: [algo] },
  ],
};

const StudentDashboard = () => {
  return (
    <>
    <div className="flex flex-col lg:flex-row py-20 px-4 lg:px-0">
      {/* Left Sidebar - Student Profile */}
      <div className="w-full lg:w-1/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4 flex-shrink-0">
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Student Avatar"
            className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
          />
          <div className="mt-4">
            <h1 className="text-xl font-bold text-white">{student.name}</h1>
            <p className="text-gray-200">{student.email}</p>
            <p className="text-gray-300">Progress: {student.progress}%</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-white">Progress Overview</h2>
        <p className="text-white text-center">Track your course progress.</p>
      </div>

      {/* Center Section - Enrolled Courses */}
      <div className="flex-grow bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-2xl font-semibold mb-4 text-white">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {student.enrolledCourses.map((course, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-2" />
              <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              <p className="text-gray-400">{course.description}</p>
              <Link to={`/courses/${index}`} className="text-blue-400 hover:underline mt-2 inline-block">Go to Course</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Quick Links */}
      <div className="w-full lg:w-1/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
        <Link to="/student-profile" className="block bg-blue-300 p-4 rounded-lg mb-2 shadow hover:bg-blue-500 transition duration-300">
          View Profile
        </Link>
        <Link to="/progress" className="block bg-green-300 p-4 rounded-lg mb-2 shadow hover:bg-green-500 transition duration-300">
          Track Progress
        </Link>
        <Link to="/certificates" className="block bg-yellow-300 p-4 rounded-lg mb-2 shadow hover:bg-yellow-500 transition duration-300">
          View Certificates
        </Link>
        <Link to="/support" className="block bg-red-300 p-4 rounded-lg shadow hover:bg-red-500 transition duration-300">
          Contact Support
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default StudentDashboard;
