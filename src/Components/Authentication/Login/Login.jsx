// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault(); // Prevent form submission

//         try {
//             const response = await fetch('http://localhost:5000/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password, role }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 toast.success(data.message); // Display success message

//                 // Redirect based on user role
//                 setTimeout(() => {
//                     if (data.user.role === 'Instructor') {
//                         navigate('/instructor', { state: { user: data.user } }); // Pass user data via state
//                     } else if (data.user.role === 'Student') {
//                         navigate('/student', { state: { user: data.user } });
//                     } else if (data.user.role === 'Admin') {
//                         navigate('/admin');
//                     } else {
//                         toast.error('Unknown role.'); // Handle unexpected role
//                     }
//                 }, 1000);
//             } else {
//                 toast.error(data.message || 'Login failed.'); // Display error message
//             }
//         } catch (err) {
//             toast.error('Something went wrong: ' + err.message); // Handle network error
//         }
//     };



//     return (
//         <div className="flex justify-center mt-36">
//             <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
//                 <h2 className="text-5xl text-white font-bold mb-8 text-center">Log In</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-6 flex items-center">
//                         <label htmlFor="email" className="block text-gray-200 text-lg font-bold w-1/3">
//                             Email
//                         </label>
//                         <input 
//                             type="email" 
//                             id="email" 
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6 flex items-center">
//                         <label htmlFor="password" className="block text-gray-200 text-lg font-bold w-1/3">
//                             Password
//                         </label>
//                         <input 
//                             type="password" 
//                             id="password" 
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6 flex items-center">
//                         <label htmlFor="role" className="block text-gray-200 text-lg font-bold w-1/3">
//                             Role
//                         </label>
//                         <select 
//                             id="role" 
//                             value={role} 
//                             onChange={(e) => setRole(e.target.value)} 
//                             className="w-2/3 px-4 py-3 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
//                             required
//                         >
//                             <option value="">Select Role</option>
//                             <option value="Student">Student</option>
//                             <option value="Instructor">Instructor</option>
//                             <option value="Admin">Admin</option>
//                         </select>
//                     </div>
//                     <div className="flex items-center justify-center">
//                         <button
//                             type="submit"
//                             className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                             disabled={loading}
//                         >
//                             {loading ? 'Logging In...' : 'Log In'}
//                         </button>
//                     </div>
//                 </form>
//                 <p className="text-center text-gray-200 text-lg mt-6">
//                     Don't have an account? 
//                     <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-bold"> Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;




















import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../Layout/Header/UserContext'; // Import useUser

const LoginPage = () => {
    const { login } = useUser(); // Destructure login from useUser
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user); // Use login from UserContext
                toast.success(data.message);

                setTimeout(() => {
                    const userRole = data.user.role;
                    if (userRole === 'Instructor') {
                        navigate('/instructor', { state: { user: data.user } });
                    } else if (userRole === 'Student') {
                        navigate('/student', { state: { user: data.user } });
                    } else if (userRole === 'Admin') {
                        navigate('/admin');
                    } else {
                        toast.error('Unknown role.');
                    }
                }, 1000);
            } else {
                toast.error(data.message || 'Login failed.');
            }
        } catch (err) {
            toast.error(`Something went wrong: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center mt-36">
            <div className="w-full max-w-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
                <h2 className="text-5xl text-white font-bold mb-8 text-center">Log In</h2>
                <form onSubmit={handleLogin}>
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
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-200 text-lg mt-6">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-bold"> Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
