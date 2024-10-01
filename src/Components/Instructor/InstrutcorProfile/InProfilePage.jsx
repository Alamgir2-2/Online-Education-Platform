// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Footer from '../../Layout/Footer/Footer';
// import { toast } from 'react-toastify';

// // Instructor Profile Page Component
// const InstructorProfilePage = () => {
//   const [instructor, setInstructor] = useState(null); // State to store instructor data
//   const navigate = useNavigate(); // For navigation if needed

//   // Fetch instructor data from the backend
//   useEffect(() => {
//     const fetchInstructorData = async () => {
//       try {
//           const response = await fetch('http://localhost:5000/api/instructor', {
//               method: 'GET',
//               credentials: 'include', // Important for sending session cookies
//           });
  
//           if (response.ok) {
//               const data = await response.json();
//               setInstructor(data.instructor); // Set the fetched instructor data in state

//               // Handle the instructor data
//           } else {
//               const errorData = await response.json();
//               console.error('Error:', errorData); // Log error response
//               toast.error(errorData.message || 'Failed to fetch instructor data.');
//               navigate('/login');
//           }
//       } catch (err) {
//         console.error('Fetch error:', err); // Log network errors
//           toast.error('Something went wrong: ' + err.message);
//           navigate('/login');
//       }
//   };

//     fetchInstructorData();
//   }, [navigate]);

//   // Check if instructor data is available
//   if (!instructor) {
//     return <div className='align-middle mt-40'>Loading...</div>; // Show loading state until data is fetched
//   }

//   return (
//     <>
//       <div className="flex flex-col lg:flex-row py-20 px-4 lg:px-0">
//         {/* Instructor Profile Section */}
//         <div className="w-full lg:w-1/4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg mb-4 lg:mb-0 lg:mr-4 flex-shrink-0">
//           <div className="text-center mb-6">
//             <img
//               src={instructor.profilePicture || 'path/to/default-image.jpg'}
//               alt="Instructor"
//               className="rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto"
//             />
//             <div className="mt-4">
//               <h1 className="text-xl font-bold text-white">{instructor.name}</h1>
//               <p className="text-gray-200">{instructor.email}</p>
//               {/* <p className="text-gray-300">Rank: {instructor.rank}</p> */}
//               {/* <p className="text-gray-300">Views: {instructor.views}</p> */}
//             </div>
//           </div>
//         </div>

//         {/* Instructor Dashboard and Courses */}
//         <div className="flex-grow bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4 text-white">Dashboard</h2>
//           <h3 className="text-xl font-semibold mb-2 text-white">Your Courses</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {instructor.courses.map((course, index) => (
//               <div key={index} className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
//                 <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-lg mb-2" />
//                 <h3 className="text-lg font-semibold text-white">{course.title}</h3>
//                 <p className="text-gray-400">{course.description}</p>
//                 <Link to={`/courses/${course.id}`} className="text-blue-400 hover:underline mt-2 inline-block">View Course</Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default InstructorProfilePage;












import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InProfilePage = () => {
    const [instructorData, setInstructorData] = useState(null);
    const [error, setError] = useState('');

    const fetchInstructorData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/getInstructorProfile', {
                withCredentials: true, // This ensures cookies are sent with the request
            });
            setInstructorData(response.data);
        } catch (err) {
            console.error('Error fetching instructor data:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Unauthorized access');
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchInstructorData();
    }, []);

    if (error) {
        return <div className='mt-40'>Error: {error}</div>;
    }

    return (
        <div >
            {instructorData ? (
                <div>
                    <h1>{instructorData.name}</h1>
                    <p>Email: {instructorData.email}</p>
                    <p>Role: {instructorData.role}</p>
                </div>
            ) : (
                <p>Loading instructor data...</p>
            )}

            <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
      />
        </div>
    );
};

export default InProfilePage;
