import React, { useState, useRef } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import "../css/eventupload.css"

function EventUpload() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        location: "",
        date: "",
        file: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (selectedFile.size > maxSize) {
            setError("File size exceeds the limit of 5MB.");
            return;
        }

        Resizer.imageFileResizer(
            selectedFile,
            500,
            500,
            "JPEG",
            100,
            0,
            (resizedFile) => {
                setFormData({
                    ...formData,
                    file: resizedFile,
                });
            },
            "blob"
        );
    };

    const handleSubmit = async () => {
        const { title, content, location, date, file } = formData;

        if (!title || !content || !location || !date || !file) {
            setError("All fields are required.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", title);
        formDataToSend.append("eventImage", file);
        formDataToSend.append("content", content);
        formDataToSend.append("location", location);
        formDataToSend.append("date", date);

        try {
            const res = await axios.post(
                "http://localhost:8081/events",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setSuccess("Event uploaded successfully!");
            setError(null);
            setTimeout(handleCancel, 3000);
        } catch (err) {
            console.error(err);
            setError("Failed to upload event. Please try again later.");
            setSuccess(null);
        }
    };

    const handleCancel = () => {
        setFormData({
            title: "",
            content: "",
            location: "",
            date: "",
            file: null,
        });
        setError(null);
        setSuccess(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="py-10">
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md ">
        <h2 className="text-center text-3xl font-bold pb-6 text-gray-800">Upload Event</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
            />
            <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                rows="5"
                className="input-field"
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
            />
            <input
                type="file"
                name="file"
                onChange={handleFile}
                ref={fileInputRef}
                className="input-field"
            />
            <div className="flex justify-between mt-4">
                <button className="btn-primary" onClick={handleSubmit}>Upload</button>
                <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
        </div>
    );
}

export default EventUpload;
