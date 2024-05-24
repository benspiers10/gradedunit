import { useSelector } from "react-redux"
import React from 'react';
import { Link } from 'react-router-dom';
import './css/admindash.css';


const AdminDash = () => {

    const user = useSelector((state) => state.auth.user)
    return (
        <div className="dashboard">
            <h2 className='text-center text-2xl pb-6'>Dashboard, Welcome {user}!</h2>
            <div className="button-grid">
                <Link to="/Profile" className="dashboard-button">Profile</Link>
                <Link to="/UserList" className="dashboard-button">User List and Availability</Link>
                <Link to="/EventUpload" className="dashboard-button">Event Upload</Link>
                <Link to="/Applications" className="dashboard-button">Helper and Training Applications</Link>
                {/* <Link to="/HelperApplications" className="dashboard-button">Helper Applications</Link>
                <Link to="/TrainingApplications" className="dashboard-button">Training Applications</Link> */}
            </div>
        </div>
    );
};

export default AdminDash;