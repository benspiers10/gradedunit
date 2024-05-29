import React from 'react';
// import { useSelector } from 'react-redux'; // Redux import commented out
import Profile from '../shared/Profile'; // Importing Profile component
import FileUpload from '../components/FileUpload'; // Importing FileUpload component
import HelperRegistration from './RegisterHelper'; // Importing HelperRegistration component


const ParentDash = () => {
    // const user = useSelector((state) => state.auth.user); // Redux useSelector hook commented out

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-10">
                {/* Heading */}
                <h2 className="text-center text-3xl font-bold pb-6 text-gray-800">
                    Dashboard, Welcome Parent!
                </h2>
                {/* Two-column layout */}
                <div className="flex flex-wrap -mx-4">
                    {/* Left column for Profile component */}
                    <div className="w-full lg:w-1/2 ">
                        <Profile />
                    </div>
                    {/* Right column for FileUpload and HelperRegistration components */}
                    <div className="w-full lg:w-1/2 px-4 mb-6">
                        <div className="flex flex-col space-y-6">
                            {/* FileUpload component for uploading files */}
                            <FileUpload />
                            {/* HelperRegistration component for registering as a helper */}
                            <HelperRegistration />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDash; // Exporting ParentDash component
