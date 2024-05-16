import React, { useState } from "react";
import axios from "axios";

function FileUpload({ userName }) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('location', location);
        formData.append('posted_by', userName);

        axios.post('http://localhost:8081/gallery', formData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    const handleCancel = () => {
        setFile(null);
        setTitle('');
        setContent('');
        setLocation('');
    };

    return (
        <div className="flex content-center">
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

export default FileUpload;
