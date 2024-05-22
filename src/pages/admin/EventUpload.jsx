import React, { useState } from "react";
import axios from "axios";

function EventUpload({}) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file || !title || !content || !location) {
            setError('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
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
            handleCancel();
        } catch (err) {
            console.error(err);
            setError('Failed to upload event. Please try again later.');
        }
    }

    const handleCancel = () => {
        setFile(null);
        setTitle('');
        setContent('');
        setLocation('');
        setError(null);
    };

    return (
        <div className="flex content-center">
            {error && <p className="text-red-500">{error}</p>}
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
            />
            <input type="file" name="image" onChange={handleFile} />
            <button className="m-2 px-3 py-3 rounded-sm bg-cyan-400" onClick={handleUpload}>Upload</button>
            <button className="m-2 px-3 py-3 rounded-sm bg-cyan-400" onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default EventUpload;
