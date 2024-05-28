import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer'; // Import the image resizer library

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [file, setFile] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/${username}`);
                setProfile(response.data);
            } catch (error) {
                setError('Error fetching profile');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB (adjust as needed)
        if (selectedFile.size > maxSize) {
            alert('File size exceeds the limit of 5MB.');
            return;
        }
        Resizer.imageFileResizer(
            selectedFile,
            400, // New width (adjust as needed)
            400, // New height (adjust as needed)
            'JPEG', // Format
            100, // Quality (adjust as needed)
            0, // Rotation (0 for no rotation)
            (resizedFile) => {
                setFile(resizedFile);
            },
            'blob' // Output type
        );
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', profile.email);
        formData.append('username', profile.username);
        
        if (file) {
            formData.append('profileImage', file);
        }

        formData.append('firstname', profile.firstname);
        formData.append('surname', profile.surname);
        formData.append('address', profile.address);
        formData.append('phone', profile.phone);

        try {
            const response = await axios.put(`http://localhost:8081/users/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProfile(response.data);
            setEditMode(false);
        } catch (error) {
            setError('Error updating profile');
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h2>
                    <div className="flex flex-col items-center">
                        <img
                            src={`http://localhost:8081/${profile.img_path}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        {editMode ? (
                            <form onSubmit={handleFormSubmit} className="w-full">
                                <div className="mb-4">
                                    <label className="block text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleInputChange}
                                        placeholder="Username"
                                        disabled
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        disabled
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={profile.firstname || ''}
                                        onChange={handleInputChange}
                                        placeholder="First Name"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Surname</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={profile.surname || ''}
                                        onChange={handleInputChange}
                                        placeholder="Surname"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={profile.address || ''}
                                        onChange={handleInputChange}
                                        placeholder="Address"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Phone</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        value={profile.phone || ''}
                                        onChange={handleInputChange}
                                        placeholder="Phone"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Profile Image</label>
                                    <input
                                        type="file"
                                        name="profileImage"
                                        onChange={handleFileChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="w-full">
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-gray-700">Username:</p>
                                    <p className="text-gray-800">{profile.username}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-gray-700">Email:</p>
                                    <p className="text-gray-800">{profile.email}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-gray-700">Full Name:</p>
                                    <p className="text-gray-800">{profile.firstname} {profile.surname}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-gray-700">Address:</p>
                                    <p className="text-gray-800">{profile.address}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-gray-700">Phone:</p>
                                    <p className="text-gray-800">{profile.phone}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-lg font-semibold text-gray-700">Role:</p>
                                    <p className="text-gray-800">
                                        {profile.role === 3 ? 'Admin' : profile.role === 2 ? 'Helper' : profile.role === 1 ? 'Parent' : 'Scout'}
                                    </p>
                                </div>
                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
