'use client'; // This directive marks the file as a Client Component
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaCloudUploadAlt } from 'react-icons/fa';

const Profile = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const {user} = useUser();

    // Load image from localStorage on initial load
    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setImagePreview(storedImage);
        }
    }, []);

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the uploaded image preview
                localStorage.setItem('profileImage', reader.result); // Save the image to localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <header className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md py-12 px-6 relative">
            <div className="container mx-auto flex items-start justify-center relative">
                {/* Background circles */}
                <div
                    className="absolute left-0 top-0 w-32 h-32 bg-indigo-100 rounded-full -ml-12 -mt-12 animate-pulse opacity-50"
                ></div>
                <div
                    className="absolute right-0 bottom-0 w-24 h-24 bg-purple-100 rounded-full -mr-12 -mb-12 animate-pulse opacity-50"
                ></div>

                {/* Centered content box */}
                <div className="z-10 bg-white p-10 rounded-xl shadow-xl flex flex-col items-center space-y-6 transform transition-transform hover:scale-105 duration-300 ease-in-out">
                    
                    {/* Image Upload */}
                    <div className="w-full flex justify-center mb-4 relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <FaCloudUploadAlt className="text-indigo-600 text-4xl mx-auto mt-8" />
                            )}
                        </div>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>

                    {/* User name */}
                    <div className="flex flex-col items-center w-full mb-4">
                        <label className="text-gray-600 text-lg font-semibold">Full Name</label>
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-indigo-600 text-2xl" />
                            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                               {user?.fullName || 'Loading User...'}
                            </h2>
                        </div>
                    </div>

                    {/* Email */}
                   <div className="flex flex-col items-center space-y-2">
                       <label className="text-gray-600 text-lg font-semibold">Email</label>
                       <div className="flex items-center space-x-3">
                           <FaEnvelope className="text-purple-600 text-2xl" />
                           <p className="text-xl text-gray-600  tracking-wide">
                              {user?.emailAddresses[0]?.emailAddress}
                           </p>
                        </div>
                   </div>

                </div>
            </div>
        </header>
    );
};

export default Profile;
