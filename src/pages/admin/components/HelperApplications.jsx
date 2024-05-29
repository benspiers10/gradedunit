import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to handle helper registration applications
function HelperApplications() {
    // State variables to store applications and error
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    // Fetch applications when the component mounts
    useEffect(() => {
        fetchApplications();
    }, []);

    // Function to fetch helper registration applications from the server
    const fetchApplications = async () => {
        try {
            const res = await axios.get('http://localhost:8081/admin/applications');
            setApplications(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch helper registration applications. Please try again later.');
        }
    };

    // Function to handle status change of helper registration applications
    const handleStatusChange = async (userId, status) => {
        try {
            await axios.patch(`http://localhost:8081/admin/applications/${userId}`, { status });
            fetchApplications(); // Refresh the applications list after updating status
        } catch (err) {
            console.error(err);
            setError('Failed to update application status. Please try again later.');
        }
    };

    // Render the UI
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold mb-4">Helper Registration Applications</h2>
            {/* Display error message if there's an error */}
            {error && <p className="text-red-500">{error}</p>}
            {/* Render the table of applications */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through each application and render a table row */}
                    {applications.map(application => (
                        <tr key={application.user_id} className="border-b border-gray-300">
                            <td className="py-2 px-4 border border-gray-200">{application.username}</td>
                            <td className="py-2 px-4 border border-gray-200">{application.email}</td>
                            <td className="py-2 px-4 border border-gray-200">{application.status}</td>
                            <td className="py-2 px-4 border border-gray-200">
                                {/* Render buttons to approve or deny application if status is 'pending' */}
                                {application.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleStatusChange(application.user_id, 'approved')} className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Approve</button>
                                        <button onClick={() => handleStatusChange(application.user_id, 'denied')} className="bg-red-500 text-white px-4 py-2 rounded">Deny</button>
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

export default HelperApplications;
