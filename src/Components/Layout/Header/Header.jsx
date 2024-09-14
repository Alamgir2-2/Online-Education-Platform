import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=" bg-opacity-75 backdrop-blur-md text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">LMS Logo</Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400 pl-2">Home</Link>
          <Link to="/courses" className="hover:text-gray-400">Courses</Link>
          <Link to="/tutorials" className="hover:text-gray-400">Tutorials</Link>
          <Link to="/community" className="hover:text-gray-400">Community</Link>
          <Link to="/blog" className="hover:text-gray-400">Blog</Link>
          <Link to="/contact" className="hover:text-gray-400 pr-2">Contact</Link>
          <Link to="/course-player" className="hover:text-gray-400">Course Player</Link>
          <Link to="/instructor" className="hover:text-gray-400">Instructor</Link>
          <Link to="/student" className="hover:text-gray-400">Student</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <input type="text" placeholder="Search..." className="p-2 rounded bg-gray-700 text-white" />
          <button className="bg-blue-900 p-2 rounded hover:bg-blue-700">Search</button>
          <Link to="/profile" className="bg-gray-700 p-2 rounded hover:bg-gray-600">User</Link>
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
            <Link to="/community" className="block px-4 py-2 hover:bg-gray-700">Community</Link>
            <Link to="/blog" className="block px-4 py-2 hover:bg-gray-700">Blog</Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700">Contact</Link>
            <Link to="/course-player" className="block px-4 py-2 hover:bg-gray-700">Course Player</Link>
            <input type="text" placeholder="Search..." className="block px-4 py-2 rounded bg-gray-700 text-white w-full" />
            <button className="block bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-full">Search</button>
            <Link to="/profile" className="block bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 w-full">User</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
