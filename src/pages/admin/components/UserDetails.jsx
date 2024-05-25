import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/${username}`);
                setUser(response.data);
            } catch (error) {
                setError('Failed to fetch user details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [username]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

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
