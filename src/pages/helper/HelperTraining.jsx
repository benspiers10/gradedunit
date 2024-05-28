import React, { useState } from "react";
import axios from "axios";

function TrainingApplication() {
    const [trainingType, setTrainingType] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!trainingType) {
                setError("Please select a training type.");
                return;
            }

            // Assuming you have a way to get the user ID, replace 'user_id' with the actual user ID
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                setError("User ID not found.");
                return;
            }

            await axios.post("http://localhost:8081/training/application", {
                userId: userId,
                trainingType: trainingType
            });
            setSuccess("Training application submitted successfully!");
        } catch (error) {
            console.error("Error submitting training application:", error);
            setError("Failed to submit training application. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setTrainingType(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Apply for Training</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="trainingType" className="block text-gray-700">Training Type:</label>
                        <select
                            id="trainingType"
                            value={trainingType}
                            onChange={handleChange}
                            className="form-select mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <option value="">Select Training Type</option>
                            <option value="Helper Training">Helper Training</option>
                            <option value="Scouts Badge">Scouts Badge</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
                    >
                        Submit Application
                    </button>

                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {success && <p className="text-green-500 mb-2">{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default TrainingApplication;
