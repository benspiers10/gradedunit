import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelperAvailabilityList = () => {
    const [availabilityList, setAvailabilityList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailabilityList = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8081/helper-availability');
                setAvailabilityList(response.data);
            } catch (error) {
                console.error('Error fetching helper availability:', error);
                setError('Failed to fetch helper availability. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAvailabilityList();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold mb-4 text-center">Helper Availability</h2>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-center">Helper ID</th>
                            <th className="px-4 py-2 text-center">Username</th>
                            <th className="px-4 py-2 text-center">Available Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availabilityList.map(availability => (
                            <tr key={availability.helper_id} className="border-b border-gray-300">
                                <td className="px-4 py-2 text-center">{availability.helper_id}</td>
                                <td className="px-4 py-2 text-center">{availability.username}</td>
                                <td className="px-4 py-2 text-center">{availability.available_days}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HelperAvailabilityList;
