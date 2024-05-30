import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer"; // Import the image resizer library

function FileUpload () {

    // setting all consts with use state and getting username from localstorage
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const username = localStorage.getItem("username")

    // Handle file selection and resize if necessary
    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // Set maximum file size to 5MB

        if (selectedFile.size > maxSize) {
            setError('File size exceeds the limit of 5MB.');
            return;
        }

        // Resize the image before setting the file state
        Resizer.imageFileResizer(
            selectedFile,
            800, // New width (adjust as needed)
            800, // New height (adjust as needed)
            'JPEG', // Format
            100, // Quality (adjust as needed)
            0, // Rotation (0 for no rotation)
            (resizedFile) => {
                setFile(resizedFile);
                setError(null);
            },
            'blob' // Output type
        );
    };

    // Handle the file upload process
    const handleUpload = () => {
        if (!file || !title || !content || !location) {
            setError('All fields are required.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('location', location);
        formData.append('posted_by', username); // Include the user's name
    
        axios.post('http://localhost:8081/gallery', formData)
            .then(res => {
                console.log(res);
                setSuccess('Image uploaded successfully!');
                handleCancel(); // Reset the form after successful upload
            })
            .catch(err => {
                console.log(err);
                setError('Failed to upload image. Please try again later.');
            });
    };


    // Reset form fields
    const handleCancel = () => {
        setFile(null);
        setTitle('');
        setContent('');
        setLocation('');
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="bg-gray-100 pt-5">
            <div className=" bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Upload Image to Gallery</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    placeholder="Location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="file" 
                    name="image" 
                    onChange={handleFile} 
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                    <button 
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                    <button 
                        className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
            </div>
        </div>
    );
}

export default FileUpload;
