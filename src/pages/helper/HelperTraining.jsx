import React, { useState } from "react";
import axios from "axios";

function Training() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        trainingType: ""
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/training/application", formData);
            setSuccess('Training application submitted successfully!');
            setFormData({
                name: "",
                email: "",
                trainingType: ""
            });
        } catch (error) {
            console.error("Error submitting training application:", error);
            setError('Failed to submit training application. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Apply for Training</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input mt-1 block w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input mt-1 block w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="trainingType" className="block text-gray-700">Training Type:</label>
                    <select id="trainingType" name="trainingType" value={formData.trainingType} onChange={handleChange} className="form-select mt-1 block w-full">
                        <option value="">Select Training Type</option>
                        <option value="Type A">Type A</option>
                        <option value="Type B">Type B</option>
                        {/* Add other options as needed */}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Application</button>
            </form>
        </div>
    );
}

export default Training;
