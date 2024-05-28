import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Profile from '../shared/Profile'; // Adjust the path to where your Profile component is located
import EventUpload from './components/EventUpload'; // Adjust the path to where your Profile component is located


const AdminDash = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-10">
                <h2 className="text-center text-3xl font-bold pb-6 text-gray-800">Dashboard, Welcome {user.name}!</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                    <Link to="/UserList" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">User List and Availability</h3>
                        </div>
                    </Link>
                    <Link to="/Applications" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Helper and Training Applications</h3>
                        </div>
                    </Link>
                </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6'>
                <Profile />
                <EventUpload />
            </div>
            </div>
        </div>
    );
};

export default AdminDash;
