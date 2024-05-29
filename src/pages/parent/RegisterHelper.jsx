import React, { useState, useEffect } from "react";
import axios from "axios";

function HelperRegistration() {
    // States to manage error, success, application status, and submission status
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Effect to check the application status and update the submission status in local storage
    useEffect(() => {
        checkApplicationStatus();
    }, []);

    useEffect(() => {
        localStorage.setItem("isSubmitted", JSON.stringify(isSubmitted));
    }, [isSubmitted]);

    // Function to check the application status
    const checkApplicationStatus = async () => {
        try {
            const userId = localStorage.getItem("user_id");
            if (userId) {
                const response = await axios.get(`http://localhost:8081/helper/applicationStatus/${userId}`);
                setApplicationStatus(response.data.status);
                const submitted = localStorage.getItem("isSubmitted");
                setIsSubmitted(submitted === "true"); // Convert string to boolean
            }
        } catch (error) {
            console.error("Error checking application status:", error);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("user_id");
            if (userId && !isSubmitted) {
                await axios.post("http://localhost:8081/helper/register", { user_id: userId });
                setSuccess("Your application has been submitted successfully!");
                setApplicationStatus("pending");
                setIsSubmitted(true);
            } else {
                setError("Application already submitted.");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            setError("Failed to submit application. Please try again later.");
        }
    };

    return (
        <div className="bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register to be a Helper!</h2>
                {/* Display application status */}
                {applicationStatus && (
                    <p className={`text-lg ${applicationStatus === "pending" ? "text-yellow-500" : "text-green-500"} text-center mb-4`}>
                        Status: {applicationStatus}
                    </p>
                )}
                {/* Display error message if there's an error */}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {/* Display success message if submission is successful */}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                {/* Render form if application status is null and submission is not yet made */}
                {applicationStatus === null && !isSubmitted && (
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                            Register to be a Helper
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default HelperRegistration;
