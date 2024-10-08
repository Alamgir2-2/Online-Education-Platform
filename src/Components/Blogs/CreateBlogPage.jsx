// import React, { useState } from 'react';
// import { FiUploadCloud } from 'react-icons/fi';
// import axios from 'axios';

// const CreateBlogPage = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     image: null,
//   });

//   const [message, setMessage] = useState('');

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const data = new FormData(); // Use a different variable name
//     data.append('title', formData.title);
//     data.append('content', formData.content);
//     if (formData.image) {
//       data.append('image', formData.image);
//     }
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/blogs', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Blog created successfully:', response.data);
//       setMessage(response.data.message); // Optionally set a success message
//     } catch (error) {
//       console.error('Error creating blog:', error);
//       setMessage('Error creating blog'); // Optionally set an error message
//     }
// };


//   return (
//     <div className="p-10 mt-20">
//       <div className="max-w-4xl mx-auto space-y-10">
//         <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
//           <h2 className="text-3xl font-bold text-white mb-6">Create a New Blog</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label className="text-white">Blog Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="Enter blog title"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="text-white">Blog Content</label>
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleInputChange}
//                 className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 placeholder="Write your blog content here..."
//                 rows="6"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               {/* <label className="text-white">Upload Image</label> */}
//               <div className="border-dashed border-4 border-teal-400 py-6 px-4 rounded-lg flex justify-center items-center text-white">
//                 <label className="cursor-pointer flex items-center space-x-3">
//                   <FiUploadCloud className="text-3xl" />
//                   <input
//                     type="file"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                   <span>{formData.image ? formData.image.name : "Upload Image"}</span>
//                 </label>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="bg-teal-500 p-4 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
//               >
//                 Submit Blog
//               </button>
//             </div>
//           </form>
//           {message && <div className="mt-4 text-center text-white">{message}</div>} {/* Display message */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateBlogPage;











import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { useUser } from '../Layout/Header/UserContext';

const CreateBlogPage = () => {
  const { user } = useUser(); // Get the user context
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('instructor_id', user.id); // Use user ID from context
  
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get the error message from response
        throw new Error(errorData.message || 'Failed to create blog'); // Throw error if response is not ok
      }
  
      const result = await response.json();
      console.log('Blog created successfully:', result);


      setFormData({ title: '', content: '', image: null });
      setMessage(result.message);

      // Optionally, reset the form or navigate to another page
      // setFormData({ title: '', content: '', image: null }); // Reset form
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div className="p-10 mt-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">Create a New Blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-white">Blog Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-white">Blog Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Write your blog content here..."
                rows="6"
                required
              />
            </div>

            <div className="mb-6">
              <div className="border-dashed border-4 border-teal-400 py-6 px-4 rounded-lg flex justify-center items-center text-white">
                <label className="cursor-pointer flex items-center space-x-3">
                  <FiUploadCloud className="text-3xl" />
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span>{formData.image ? formData.image.name : "Upload Image"}</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 p-4 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
