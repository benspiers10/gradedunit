import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelperApplications() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await axios.get('http://localhost:8081/admin/applications');
            setApplications(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch helper registration applications. Please try again later.');
        }
    };

    const handleStatusChange = async (userId, status) => {
        try {
            await axios.patch(`http://localhost:8081/admin/applications/${userId}`, { status });
            fetchApplications(); // Refresh the applications list after updating status
        } catch (err) {
            console.error(err);
            setError('Failed to update application status. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold mb-4">Helper Registration Applications</h2>
            {error && <p className="text-red-500">{error}</p>}
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
                    {applications.map(application => (
                        <tr key={application.user_id} className="border-b border-gray-300">
                            <td className="px-4 py-2">{application.username}</td>
                            <td className="px-4 py-2">{application.email}</td>
                            <td className="px-4 py-2">{application.status}</td>
                            <td className="px-4 py-2">
                                {application.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleStatusChange(application.user_id, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve</button>
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
