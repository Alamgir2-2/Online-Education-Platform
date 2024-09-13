import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here (e.g., API call for authentication)

        // Redirect based on role after successful login
        if (role === 'student') {
            navigate('/student-dashboard');
        } else if (role === 'instructor') {
            navigate('/instructor-dashboard');
        } else if (role === 'admin') {
            navigate('/admin-dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-5xl text-black font-bold mb-8 text-center">Log In</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="email" className="block text-gray-700 text-lg font-bold w-1/3">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="password" className="block text-gray-700 text-lg font-bold w-1/3">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="role" className="block text-gray-700 text-lg font-bold w-1/3">
                            Role
                        </label>
                        <select 
                            id="role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="w-2/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 text-lg mt-6">
                    Don't have an account? 
                    <a href="/signup" className="text-blue-900 hover:text-blue-700 font-bold"> Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
