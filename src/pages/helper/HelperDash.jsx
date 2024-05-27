import { useSelector } from "react-redux";
import React from 'react';
import { Link } from 'react-router-dom';

const Dash = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-bold pb-6 text-gray-800">Dashboard, Welcome {user}!</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <Link to="/Profile" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Profile</h3>
                        </div>
                    </Link>
                    <Link to="/FileUpload" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Gallery Upload</h3>
                        </div>
                    </Link>
                    <Link to="/Availability" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Availability</h3>
                        </div>
                    </Link>
                    <Link to="/Training" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Training</h3>
                        </div>
                    </Link>
                    <Link to="/Events" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Upcoming Events</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dash;
