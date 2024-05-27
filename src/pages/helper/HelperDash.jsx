import { useSelector } from "react-redux"
import React from 'react';
import { Link } from 'react-router-dom';
import './css/helperdash.css';

const Dash = () => {

    const user = useSelector((state) => state.auth.user)
    return (
        <div>
            <div className="dashboard">
            <h2 className='text-center text-2xl pb-6'>Dashboard, Welcome {user}!</h2>
            <div className="button-grid">
                <Link to="/Profile" className="dashboard-button">Profile</Link>
                <Link to="/FileUpload" className="dashboard-button">File Upload</Link>
                <Link to="/Availability" className="dashboard-button">Availability</Link>
                <Link to="/Training" className="dashboard-button">Training</Link>
                <Link to="/Events" className="dashboard-button">Upcoming Events</Link>
            </div>
        </div>
        </div>
    )
}

export default Dash;