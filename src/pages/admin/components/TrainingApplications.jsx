import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to handle training applications
function TrainingApplications() {
    // State variables to store training applications and error
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    // Fetch training applications when the component mounts
    useEffect(() => {
        fetchTrainingApplications();
    }, []);

    // Function to fetch training applications from the server
    const fetchTrainingApplications = async () => {
        try {
            const response = await axios.get('http://localhost:8081/admin/training-applications');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching training applications:', error);
            setError('Failed to fetch training applications. Please try again later.');
        }
    };

    // Function to handle approving a training application
    const handleApprove = async (applicationId) => {
        try {
            await axios.patch(`http://localhost:8081/admin/training-applications/${applicationId}`, { status: 'approved' });
            // Refresh the training applications list after approval
            fetchTrainingApplications();
        } catch (error) {
            console.error('Error approving training application:', error);
            setError('Failed to approve training application. Please try again later.');
        }
    };

    // Function to handle denying a training application
    const handleDeny = async (applicationId) => {
        try {
            await axios.patch(`http://localhost:8081/admin/training-applications/${applicationId}`, { status: 'denied' });
            // Refresh the training applications list after denial
            fetchTrainingApplications();
        } catch (error) {
            console.error('Error denying training application:', error);
            setError('Failed to deny training application. Please try again later.');
        }
    };

    // Render the UI
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Training Applications</h1>
            {/* Display error message if there's an error */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {/* Render the table of training applications */}
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border border-gray-200">User ID</th>
                        <th className="py-2 px-4 border border-gray-200">Training Type</th>
                        <th className="py-2 px-4 border border-gray-200">Status</th>
                        <th className="py-2 px-4 border border-gray-200">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through each training application and render a table row */}
                    {applications.map(application => (
                        <tr key={application.application_id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border border-gray-200">{application.user_id}</td>
                            <td className="py-2 px-4 border border-gray-200">{application.training_type}</td>
                            <td className="py-2 px-4 border border-gray-200">{application.status}</td>
                            <td className="py-2 px-4 border border-gray-200">
                                {/* Render buttons to approve or deny training application if status is 'Training' */}
                                {application.status === 'Training' && (
                                    <>
                                        <button onClick={() => handleApprove(application.application_id)} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Approve</button>
                                        <button onClick={() => handleDeny(application.application_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Deny</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TrainingApplications;
