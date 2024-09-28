import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        const userData = {
            name,
            email,
            password,
            role
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            console.log('Response data:', data); // Log response data
    
            if (response.ok) {
                toast.success('Sign up successful!'); // Show success toast
                setTimeout(() => {
                    navigate('/login'); // Navigate after a delay
                }, 2000);
            } else {
                // Show error toast based on the message
                if (data.error) {
                    toast.error("Sign up failed!");
                } else {
                    toast.error('Sign up failed!');
                }
            }
        } catch (error) {
            console.error('Error during signup:', error); // Log the error
            toast.error('Error occurred during signup.');
        }
    };
    

    return (
        <div className="flex justify-center mt-36">
            <div className="w-full max-w-lg p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
                <h2 className="text-5xl text-white font-bold mb-8 text-center">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="name" className="block text-gray-200 text-lg font-bold w-1/3">
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-2/3 px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-2/3 px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-2/3 px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
                            className="w-2/3 px-4 py-3 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
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
                            Sign Up
                        </button>
                    </div>
                </form>
                <ToastContainer position="middle-center" autoClose={2000} /> {/* Toast container */}
            </div>
        </div>
    );
};

export default SignupPage;
