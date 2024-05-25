import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Map enum values to their corresponding display labels
const trainingStatusLabels = {
    not_applicable: 'N/A',
    training: 'Training',
    trained: 'Trained'
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8081/users');
                setUsers(response.data);
            } catch (error) {
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8081/users/${userId}`);
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user. Please try again later.');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/AvailabilityList" className="dashboard-button float-right">Helper Availability</Link>
            <h2 className='pb-6 pt-10 text-2xl text-center'>User List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border">Profile</th>
                                <th className="px-4 py-2 border">Username</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Training Status</th>
                                <th className="px-4 py-2 border">Details</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 border text-center">
                                        <img src={`http://localhost:8081/${user.img_path}`} alt={user.username} className="w-14 h-10 rounded-full mx-auto" />
                                    </td>
                                    <td className="px-4 py-2 border text-center">{user.username}</td>
                                    <td className="px-4 py-2 border text-center">{user.email}</td>
                                    <td className="px-4 py-2 border text-center">{user.role === 3 ? 'Admin' : user.role === 2 ? 'Helper' : user.role === 1 ? 'Parent' : 'Scout'}</td>
                                    <td className="px-4 py-2 border text-center">{trainingStatusLabels[user.training_status]}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <Link to={`/UserDetails/${user.username}`} className='bg-blue-500 text-white px-4 py-2 rounded'>
                                            More Information
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        {user.role !== 3 && (
                                            <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={() => handleDelete(user.id)}>
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
