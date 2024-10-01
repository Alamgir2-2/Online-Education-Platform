import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import algo from '../../../assets/CourseImage/algo.png';
import python from '../../../assets/CourseImage/python.png';
import cprogram from '../../../assets/CourseImage/cprogram.jpeg';
import man from '../../../assets/man.webp';
import Footer from '../../Layout/Footer/Footer';
import { useUser } from '../../Layout/Header/UserContext';

// Dummy student data (you can remove this part later)
const dummyCourses = [
  { title: "Course A", description: "Learn the basics of Course A", image: algo },
  { title: "Course B", description: "Learn the basics of Course B", image: python },
  { title: "Course C", description: "Learn the basics of Course C", image: cprogram },
];

const StudentDashboard = () => {
  const location = useLocation();
  const { user } = useUser();
  // const { user } = location.state || {}; // Get user data from location state
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     // navigate('/login'); // Redirect to login if user data is not available
  //   }
  // }, [user, navigate]);

  return (
    <>
      <div className="flex flex-col lg:flex-row py-20 px-4 lg:px-0 gap-8">
        {/* Left Sidebar - Student Profile */}
        <div className="w-full lg:w-1/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4 flex-shrink-0">
          <div className="text-center mb-6">
            <img
              src={man}
              alt="Student Avatar"
              className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
            />
            <div className="mt-4">
              <h1 className="text-xl font-bold text-white">{user.name || "Student Name"}</h1>
              <p className="text-gray-200">{user.email || "student@example.com"}</p>
              {/* You can fetch progress from the user object when it's available */}
              <p className="text-gray-300">Progress: {/* Insert logic to fetch progress if available */}65%</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-2 text-white">Progress Overview</h2>
          <p className="text-white text-center">Track your course progress.</p>
        </div>

        {/* Center Section - Enrolled Courses */}
        <div className="flex-grow bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4">
          <h2 className="text-2xl font-semibold mb-4 text-white">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dummyCourses.map((course, index) => (
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
          <Link to="/support" className="block bg-red-300 p-4 rounded-lg mb-2 shadow hover:bg-red-500 transition duration-300">
            Contact Support
          </Link>
          <Link to="/update-profile" className="block bg-purple-300 p-4 rounded-lg shadow hover:bg-purple-500 transition duration-300">
            Update Profile
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentDashboard;
