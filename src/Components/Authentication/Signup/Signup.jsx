import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    return (
        <div className="flex justify-center mt-36">
            <div className="w-full max-w-lg p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
                <h2 className="text-5xl text-white font-bold mb-8 text-center">Sign Up</h2>
                <form>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="name" className="block text-gray-200 text-lg font-bold w-1/3">
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-2/3 px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 shadow-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="email" className="block text-gray-200 text-lg font-bold w-1/3">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-2/3 px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 shadow-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="password" className="block text-gray-200 text-lg font-bold w-1/3">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="role" className="block text-gray-200 text-lg font-bold w-1/3">
                            Role
                        </label>
                        <select 
                            id="role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={()=>navigate('/course-player')}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-200 text-lg mt-6">
                    Already have an account? 
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold"> Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
