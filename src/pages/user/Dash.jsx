
import React from 'react';
import { Link } from 'react-router-dom';
import BadgeProgress from "./BadgeProgress";
import FileUpload from "../components/FileUpload";
import Profile from "../shared/Profile";

const Dash = () => {

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto">
                {/* Dashboard title */}
                <h2 className="text-center text-3xl font-bold pb-6 text-gray-800">Dashboard, Welcome Scout!</h2>
                {/* Dashboard grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Link to Games page */}
                    <Link to="/Games" className="dashboard-card">
                        {/* Games card */}
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Games</h3>
                        </div>
                    </Link>
                </div>
                {/* Additional grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {/* Profile component */}
                    <Profile />
                    {/* FileUpload component */}
                    <FileUpload />
                    {/* BadgeProgress component */}
                    <BadgeProgress />
                </div>
            </div>
        </div>
    );
};

export default Dash;
