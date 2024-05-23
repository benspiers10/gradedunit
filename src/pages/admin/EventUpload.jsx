import React, { useState } from "react";
import axios from "axios";

function EventUpload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !title || !content || !location) {
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('eventImage', file);  // Changed to 'eventImage' to match backend field name
        formData.append('title', title);
        formData.append('content', content);
        formData.append('location', location);

        try {
            const res = await axios.post('http://localhost:8081/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            setSuccess('Event uploaded successfully!');
            handleCancel(); // Reset the form after successful upload
        } catch (err) {
            console.error(err);
            setError('Failed to upload event. Please try again later.');
        }
    };

    const handleCancel = () => {
        setFile(null);
        setTitle('');
        setContent('');
        setLocation('');
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="m-2 p-2 border border-gray-300 rounded"
            />
            <textarea 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                className="m-2 p-2 border border-gray-300 rounded"
            />
            <input 
                type="text" 
                placeholder="Location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                className="m-2 p-2 border border-gray-300 rounded"
            />
            <input 
                type="file" 
                name="eventImage" 
                onChange={handleFile} 
                className="m-2 p-2 border border-gray-300 rounded"
            />
            <div className="flex">
                <button 
                    className="m-2 px-3 py-2 rounded bg-cyan-400 text-white" 
                    onClick={handleUpload}
                >
                    Upload
                </button>
                <button 
                    className="m-2 px-3 py-2 rounded bg-cyan-400 text-white" 
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EventUpload;
