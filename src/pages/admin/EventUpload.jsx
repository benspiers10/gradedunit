import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";

function EventUpload() {
    const [formData, setFormData] = useState({
        file: null,
        title: "",
        content: "",
        location: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
            300,
            300,
            "JPEG",
            100,
            0,
            (resizedFile) => {
                setFormData({
                    ...formData,
                    file: resizedFile,
                });
                setError(null);
            },
            "blob"
        );
    };

    const handleSubmit = () => {
        const { file, title, content, location } = formData;

        if (!file || !title || !content || !location) {
            setError("All fields are required.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("image", file);
        formDataToSend.append("title", title);
        formDataToSend.append("content", content);
        formDataToSend.append("location", location);

        axios
            .post("http://localhost:8081/gallery", formDataToSend)
            .then((res) => {
                console.log(res);
                setSuccess("Event uploaded successfully!");
                handleCancel();
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to upload event. Please try again later.");
            });
    };

    const handleCancel = () => {
        setFormData({
            file: null,
            title: "",
            content: "",
            location: "",
        });
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Upload Event
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleFile}
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handleSubmit}
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
            </div>
        </div>
    );
}

export default EventUpload;
