import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import algo from '../../../assets/CourseImage/algo.png';
import python from '../../../assets/CourseImage/python.png';
import cprogram from '../../../assets/CourseImage/cprogram.jpeg';
import man from '../../../assets/photo.jpg';
import Footer from '../../Layout/Footer/Footer';
import { useUser } from '../../Layout/Header/UserContext';


const dummyCourses = [
    { title: "Data Structure and Algorithm", description: "Learn the basics of Algorithm", image: algo },
    { title: "Learn Python", description: "Learn the basics of Python ", image: python },
    { title: "C Programming", description: "Learn the basics of C Programming", image: cprogram },
];


// Instructor Profile Page Component
const InstructorProfilePage = () => {

    const { user } = useUser();
    // Get user data from location state
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         // navigate('/login'); // Redirect to login if user data is not available
    //     }
    // }, [user, navigate]);

    return (
        <>
            <div className="flex flex-col lg:flex-row py-20 px-4 lg:px-0 gap-8">
                {/* Instructor Profile Section */}
                <div className="w-full lg:w-1/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 flex-shrink-0">
                    <div className="text-center mb-6">
                        <img
                            src={man}
                            alt="Student Avatar"
                            className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
                        />
                        <div className="mt-4">
                            <h1 className="text-xl font-bold text-white">{user.name}</h1>
                            <p className="text-gray-200">{user.email}</p>
                            <p className="text-gray-200 font-bold">{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* Instructor Dashboard and Courses */}
                <div className="flex-grow bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Dashboard</h2>
                    <h3 className="text-xl font-semibold mb-2 text-white">Your Courses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {dummyCourses.map((course, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                                <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                <p className="text-gray-400">{course.description}</p>
                                <Link to={`/courses/${course.id}`} className="text-blue-400 hover:underline mt-2 inline-block">View Course</Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar - Other Options */}
                <div className="w-full lg:w-1/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Dashboard Options</h2>
                    <Link to="/manage-courses" className="block bg-green-500 p-4 rounded-lg mb-2 shadow hover:bg-green-800 transition duration-300">
                        Manage Courses
                    </Link>
                    <Link to="/new-course" className="block bg-yellow-500 p-4 rounded-lg mb-2 shadow hover:bg-yellow-700 transition duration-300">
                        Create New Course
                    </Link>
                    <Link to="/write-blog" className="block bg-purple-300 p-4 rounded-lg mb-2 shadow hover:bg-purple-500 transition duration-300">
                        Write a Blog
                    </Link>
                    <Link to="/upload-video" className="block bg-red-300 p-4 rounded-lg mb-2 shadow hover:bg-red-500 transition duration-300">
                        Upload Video
                    </Link>
                    <Link to="/track-progress" className="block bg-teal-500 p-4 rounded-lg shadow hover:bg-teal-800 transition duration-300">
                        Track Student Progress
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default InstructorProfilePage;

