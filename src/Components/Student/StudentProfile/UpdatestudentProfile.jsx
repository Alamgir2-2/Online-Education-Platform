import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import Footer from '../../Layout/Footer/Footer';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [bio, setBio] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        thumbnail: null,
        profilePhoto: null,
    });

    // Handle profile photo change
    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePhoto: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can add your API call logic here to update the user profile
        // For now, we'll just log the data to the console
        console.log({ name, number, bio, profilePhoto });

        // Redirect after successful update
        navigate('/student-dashboard');
    };

    return (
        <>
            <div className="flex flex-col items-center py-20 px-4 lg:px-0">
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Update Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full mt-2 p-3 bg-white bg-opacity-20 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="mt-6">
                            <label className="text-white">Profile Photo</label>
                            <div className="border-dashed border-4 border-teal-400 py-6 px-4 rounded-lg mt-2 text-white">
                                <label className="cursor-pointer flex items-center space-x-3">
                                    <FiUploadCloud className="text-3xl" />
                                    <input
                                        type="file"
                                        onChange={handleProfilePhotoChange}
                                        className="hidden"
                                    />
                                    <span>{formData.profilePhoto ? formData.profilePhoto.name : 'Upload Profile Photo'}</span>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-500 mt-4 p-3 rounded-lg text-white shadow-md hover:bg-teal-600 transition duration-200"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProfile;
