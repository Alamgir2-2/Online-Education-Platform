// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from "../../../../public/logo.png"

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className=" bg-opacity-75 backdrop-blur-md text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold"><img className="h-12 w-auto" src={logo} alt="" /></Link>
//         <nav className="hidden md:flex space-x-4">
//           <Link to="/" className="hover:text-gray-400 pl-2">Home</Link>
//           <Link to="/courses" className="hover:text-gray-400">Courses</Link>
//           <Link to="/tutorials" className="hover:text-gray-400">Tutorials</Link>
//           <Link to="/community" className="hover:text-gray-400">Community</Link>
//           <Link to="/blog" className="hover:text-gray-400">Blog</Link>
//           <Link to="/contact" className="hover:text-gray-400 pr-2">Contact</Link>
//           <Link to="/course-player" className="hover:text-gray-400">Course Player</Link>
//           {/* <Link to="/instructor" className="hover:text-gray-400">Instructor</Link>
//           <Link to="/student" className="hover:text-gray-400">Student</Link> */}
//         </nav>
//         <div className="hidden md:flex items-center space-x-4">
//           <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-700 text-white" />
//           <button className="bg-blue-900 p-2 rounded hover:bg-blue-700">Search</button>
//           <Link to="/login" className="bg-gray-700 p-2 rounded hover:bg-gray-600">User</Link>
//         </div>
//         <button className="md:hidden" onClick={toggleMenu}>
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
//           </svg>
//         </button>
//       </div>
//       {isOpen && (
//         <div className="md:hidden">
//           <nav className="space-y-2">
//             <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
//             <Link to="/courses" className="block px-4 py-2 hover:bg-gray-700">Courses</Link>
//             <Link to="/tutorials" className="block px-4 py-2 hover:bg-gray-700">Tutorials</Link>
//             <Link to="/community" className="block px-4 py-2 hover:bg-gray-700">Community</Link>
//             <Link to="/blog" className="block px-4 py-2 hover:bg-gray-700">Blog</Link>
//             <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700">Contact</Link>
//             <Link to="/course-player" className="block px-4 py-2 hover:bg-gray-700">Course Player</Link>
//             <input type="text" placeholder="Search..." className="block px-4 py-2 rounded bg-gray-700 text-white w-full" />
//             <button className="block bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-full">Search</button>
//             <Link to="/profile" className="block bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 w-full">User</Link>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FaUser, FaTachometerAlt, FaSignOutAlt} from 'react-icons/fa'; // Importing icons from react-icons
import { useUser } from './UserContext'; // Import UserContext
import logo from "../../../../public/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useUser(); // Destructure user and logout from useUser
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  

  const handleLogout = async () => {
    try {
      // Send logout request to the backend (optional)
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
      });

      // Call logout function from UserContext
      logout(); // Clear user data in context
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-opacity-75 backdrop-blur-md text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-400 flex">
          <img className="h-12 w-auto" src={logo} alt="Logo" />
          {/* ePlatform */}
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400 pl-2">Home</Link>
          <Link to="/courses" className="hover:text-gray-400">Courses</Link>
          {/* <Link to="/tutorials" className="hover:text-gray-400">Tutorials</Link> */}
          {/* <Link to="/community" className="hover:text-gray-400">Community</Link> */}
          <Link to="/blog" className="hover:text-gray-400">Blog</Link>
          <Link to="/contact" className="hover:text-gray-400 pr-2">Contact</Link>
          {/* <Link to="/course-player" className="hover:text-gray-400">Course Player</Link> */}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-700 text-white" />
          <button className="bg-blue-900 p-2 rounded hover:bg-blue-700">Search</button>
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="text-lg hover:bg-gray-600 px-4 py-2 rounded">
                {user.name}
              </button>
              

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white  rounded-lg shadow-2xl border border-gray-200 z-10 transition-all duration-300 ease-in-out transform hover:scale-105">
                  <Link
                    to={user.role === 'Student' ? "/student-profile" : "/instructor-profile"}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg transition-colors duration-200 ease-in-out"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser className="h-5 w-5 mr-2 text-blue-500" /> {/* Replacing SVG with FaUser icon */}
                    Profile
                  </Link>
                  <Link
                    to={user.role === 'Student' ? "/student" : "/instructor"}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaTachometerAlt className="h-5 w-5 mr-2 text-green-500" /> {/* Replacing SVG with FaTachometerAlt icon */}
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-b-lg transition-colors duration-200 ease-in-out"
                  >
                    <FaSignOutAlt className="h-5 w-5 mr-2 text-red-500" /> {/* Replacing SVG with FaSignOutAlt icon */}
                    Logout
                  </button>
                </div>
              )}


            </div>
          ) : (
            <Link to="/login" className="bg-gray-700 p-2 rounded hover:bg-gray-600">Login</Link>
          )}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <nav className="space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
            <Link to="/courses" className="block px-4 py-2 hover:bg-gray-700">Courses</Link>
            <Link to="/tutorials" className="block px-4 py-2 hover:bg-gray-700">Tutorials</Link>
            {/* <Link to="/community" className="block px-4 py-2 hover:bg-gray-700">Community</Link> */}
            <Link to="/blog" className="block px-4 py-2 hover:bg-gray-700">Blog</Link>
            {/* <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700">Contact</Link> */}
            {/* <Link to="/course-player" className="block px-4 py-2 hover:bg-gray-700">Course Player</Link> */}
            <input type="text" placeholder="Search..." className="block px-4 py-2 rounded bg-gray-700 text-white w-full" />
            <button className="block bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-full">Search</button>
            {user ? (
              <div>
                <Link to="/student-profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                <Link to="/student" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="block bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 w-full">Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
