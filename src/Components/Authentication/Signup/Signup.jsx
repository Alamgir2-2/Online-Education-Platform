import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent form submission

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message); // Display success message
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after a short delay
                }, 2000);
            } else {
                toast.error(data.message); // Display error message
            }
        } catch (err) {
            toast.error('Something went wrong'); // Handle network error
        }
    };

    return (
        <div className="flex justify-center mt-36">
            <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
                <h2 className="text-5xl text-white font-bold mb-8 text-center">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    {/* Input fields here */}
                    <div className="mb-6 flex items-center">
                        <label htmlFor="name" className="block text-gray-200 text-lg font-bold w-1/3">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="email" className="block text-gray-200 text-lg font-bold w-1/3">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="password" className="block text-gray-200 text-lg font-bold w-1/3">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <label htmlFor="role" className="block text-gray-200 text-lg font-bold w-1/3">Role</label>
                        <select 
                            id="role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-200 text-lg mt-6">
                    Already have an account? 
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold"> Log in</Link>
                </p>
            </div>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />
        </div>
    );
};

export default SignupPage;
