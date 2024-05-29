import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display helper availability list
const HelperAvailabilityList = () => {
    // State variables to store availability list, loading state, and error message
    const [availabilityList, setAvailabilityList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch availability list data from the server on component mount
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

    // Render the UI based on loading and error states
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold mb-4 text-center">Helper Availability</h2>
            {/* Display loading message if data is being fetched */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : error ? ( // Display error message if there's an error
                <p className="text-center text-red-500">{error}</p>
            ) : (
                // Display availability list if data is fetched successfully
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-center">Helper ID</th>
                            <th className="px-4 py-2 text-center">Username</th>
                            <th className="px-4 py-2 text-center">Available Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through availability list and display each availability */}
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
