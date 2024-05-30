// Import necessary dependencies
import React, { useEffect, useState } from 'react'; // React core library
import axios from 'axios'; // Axios for HTTP requests
import Resizer from 'react-image-file-resizer'; // Import the image resizer library

// Profile component
const Profile = () => {
    // State variables to manage profile data, loading state, error state, edit mode, and file for image upload
    const [profile, setProfile] = useState({}); // Profile data state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [editMode, setEditMode] = useState(false); // Edit mode state
    const [file, setFile] = useState(null); // File state for image upload
    const username = localStorage.getItem('username'); // Get username from localStorage

    // Effect hook to fetch user profile data on component mount or when the username changes
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch user profile data from server
                const response = await axios.get(`http://localhost:8081/users/${username}`);
                setProfile(response.data); // Set profile data state with response data
            } catch (error) {
                // Handle errors when fetching profile data
                setError('Error fetching profile');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false); // Set loading state to false regardless of success or failure
            }
        };

        fetchProfile(); // Call fetchProfile function
    }, [username]); // Depend on username change

    // Function to handle input change for profile fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value }); // Update profile state with new input value
    };

    // Function to handle file input change for profile image upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the selected file
        const maxSize = 5 * 1024 * 1024; // 5MB (adjust as needed)
        if (selectedFile.size > maxSize) {
            // Check if file size exceeds the limit
            alert('File size exceeds the limit of 5MB.');
            return;
        }
        // Resize the selected image and set it as file state
        Resizer.imageFileResizer(
            selectedFile,
            400, // New width (adjust as needed)
            400, // New height (adjust as needed)
            'JPEG', // Format
            100, // Quality (adjust as needed)
            0, // Rotation (0 for no rotation)
            (resizedFile) => {
                setFile(resizedFile); // Set file state with resized image
            },
            'blob' // Output type
        );
    };

    // Function to handle form submission for profile updates
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(); // Create new FormData object
        formData.append('email', profile.email); // Append email to form data
        formData.append('username', profile.username); // Append username to form data

        // Append profile image file if it exists
        if (file) {
            formData.append('profileImage', file);
        }

        // Append other profile data to form data
        formData.append('firstname', profile.firstname);
        formData.append('surname', profile.surname);
        formData.append('address', profile.address);
        formData.append('phone', profile.phone);

        try {
            // Send updated profile data to server
            const response = await axios.put(`http://localhost:8081/users/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
                }
            });
            setProfile(response.data); // Update profile state with response data
            setEditMode(false); // Switch off edit mode after successful update
        } catch (error) {
            // Handle errors when updating profile
            setError('Error updating profile');
            console.error('Error updating profile:', error);
        }
    };

    // Render loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render error state
    if (error) {
        return <p>{error}</p>;
    }

    // Render profile information and edit form based on edit mode, getting input if edited into contact_information table on db
    return (
        <div className=" bg-gray-100 pt-5">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h2>
                    <div className="flex flex-col items-center">
                        {/* profile picture */}
                        <img
                            src={`http://localhost:8081/${profile.img_path}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        {/* Render edit form when in edit mode */}
                        {editMode ? (
                            <form onSubmit={handleFormSubmit} className="w-full">
                                {/* Input fields for profile data */}
                                <div className="mb-4">
                                    {/* Username and Email inputs are disabled as they cannot be changed */}
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
                                {/* Other inputs can be edited */}
                                <div className="mb-4">
                                    {/* first name */}
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
                                    {/* surname */}
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
                                    {/* Address */}
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
                                    {/* Phone number */}
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
                                    {/* Profile image input allows for uploading new images */}
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
                            // Render profile information when not in edit mode
                            <div className="w-full">
                                <div className="mb-4">
                                    {/* Display profile information */}
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
                                {/* Edit button to switch to edit mode */}
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

export default Profile; // exporting component
