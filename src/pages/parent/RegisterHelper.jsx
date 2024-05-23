import React, { useState, useEffect } from "react";
import axios from "axios";

function HelperRegistration() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        checkApplicationStatus();
    }, []);

    useEffect(() => {
        localStorage.setItem("isSubmitted", JSON.stringify(isSubmitted));
    }, [isSubmitted]);

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
        <div className="text-center text-2xl pb-6">
            <h2 className="text-center text-2xl pb-6">Register to be a helper!</h2>
            {applicationStatus && (
                <p>Status: {applicationStatus}</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            {applicationStatus !== "pending" && applicationStatus !== "denied" && !isSubmitted && (
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Register to be a Helper
                    </button>
                </form>
            )}
        </div>
    );
}

export default HelperRegistration;
