// This component represents a form for submitting training applications. It allows users to select a training type from a dropdown menu and submit their application.

import React, { useState } from "react";
import axios from "axios"; // Importing Axios for making HTTP requests

function TrainingApplication() {
    // State variables for storing selected training type, error message, and success message
    const [trainingType, setTrainingType] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Check if a training type is selected
            if (!trainingType) {
                setError("Please select a training type."); // Set error message if no training type is selected
                return; // Exit function
            }

            // Get user ID from local storage
            const userId = localStorage.getItem("user_id");
            if (!userId) {
                setError("User ID not found."); // Set error message if user ID is not found
                return; // Exit function
            }

            // Send POST request to submit training application
            await axios.post("http://localhost:8081/training/application", {
                userId: userId,
                trainingType: trainingType
            });
            setSuccess("Training application submitted successfully!"); // Set success message if application is submitted successfully
        } catch (error) {
            console.error("Error submitting training application:", error); // Log error to console
            setError("Failed to submit training application. Please try again later."); // Set error message if submission fails
        }
    };

    // Function to handle training type selection change
    const handleChange = (e) => {
        setTrainingType(e.target.value); // Update selected training type in state
    };

    // Rendering the component
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
                {/* Form for submitting training application */}
                <h2 className="text-2xl font-bold mb-4 text-center">Apply for Training</h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Dropdown menu for selecting training type */}
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
                    {/* Button to submit the application */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
                    >
                        Submit Application
                    </button>

                    {/* Display error message if there is an error */}
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {/* Display success message if application is submitted successfully */}
                    {success && <p className="text-green-500 mb-2">{success}</p>}
                </form>
            </div>
        </div>
    );
}

export default TrainingApplication; // Exporting TrainingApplication component
