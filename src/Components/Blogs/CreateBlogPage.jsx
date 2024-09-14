import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const CreateBlogPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log('Blog Submitted:', formData);
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
              {/* <label className="text-white">Upload Image</label> */}
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
