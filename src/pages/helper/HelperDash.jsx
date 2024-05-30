import React from 'react';
import { Link } from 'react-router-dom'; //importing link for rrd
import Profile from '../shared/Profile'; // Importing the Profile component
import FileUpload from '../components/FileUpload'; // Importing the FileUpload component
import TrainingApplication from "./HelperTraining"; // Importing the TrainingApplication component

const HelperDash = () => {
    // Component rendering
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                {/* Dashboard header */}
                <h2 className="text-center text-3xl font-bold pb-6 text-gray-800">Dashboard, Welcome Helper!</h2>
                {/* Grid layout for dashboard cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {/* Link to Availability page */}
                    <Link to="/Availability" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Availability</h3>
                        </div>
                    </Link>
                    {/* Link to Events page */}
                    <Link to="/Events" className="dashboard-card">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-center text-gray-800">Upcoming Events</h3>
                        </div>
                    </Link>
                </div>
                {/* Profile display and file upload */}
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/2">
                        <Profile /> {/* Rendering Profile component */}
                    </div>
                    <div className="w-full lg:w-1/2 px-4 mb-6">
                        <div className="flex flex-col space-y-6">
                            <FileUpload /> {/* Rendering FileUpload component */}
                            <TrainingApplication /> {/* Rendering TrainingApplication component */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelperDash; // Exporting HelperDash component
