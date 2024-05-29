import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Component to display user details fetched from the server
const UserDetails = () => {
    // Extracting the username parameter from the URL
    const { username } = useParams();
    // State variables to store user data, loading state, and error state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data from the server when the component mounts or the username parameter changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data from the server based on the username
                const response = await axios.get(`http://localhost:8081/users/${username}`);
                // Update the user state with the fetched data
                setUser(response.data);
            } catch (error) {
                // If an error occurs during fetching, set the error state
                setError('Failed to fetch user details. Please try again later.');
            } finally {
                // Set loading state to false after fetching completes
                setLoading(false);
            }
        };

        // Call the fetchUserData function when the component mounts or the username parameter changes
        fetchUserData();
    }, [username]);

    // If loading, display a loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If there's an error, display the error message
    if (error) {
        return <p>{error}</p>;
    }

    // If user data is available, display the user details
    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            {user && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                            <tr className="bg-gray-100 border-b">
                                <td className="px-4 py-2 font-medium text-gray-900">First Name:</td>
                                <td className="px-4 py-2 text-gray-700">{user.firstname}</td>
                            </tr>
                            <tr className="bg-gray-50 border-b">
                                <td className="px-4 py-2 font-medium text-gray-900">Surname:</td>
                                <td className="px-4 py-2 text-gray-700">{user.surname}</td>
                            </tr>
                            <tr className="bg-gray-100 border-b">
                                <td className="px-4 py-2 font-medium text-gray-900">Address:</td>
                                <td className="px-4 py-2 text-gray-700">{user.address}</td>
                            </tr>
                            <tr className="bg-gray-50 border-b">
                                <td className="px-4 py-2 font-medium text-gray-900">Phone:</td>
                                <td className="px-4 py-2 text-gray-700">{user.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
