import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Importing Outlet and useLocation
import Header from "../pages/components/Header"; // Importing the Header component
import Footer from "../pages/components/Footer"; // Importing the Footer component

// Component for the root layout of the application
const RootLayout = () => {
    const location = useLocation();

    // List of dashboard paths where the footer should not be displayed
    const dashboardPaths = [
        '/Dash',
        '/ParentDash',
        '/AdminDash',
        '/HelperDash',
        '/UserList', //admin
        '/AvailabilityList', //admin
        '/Applications', //admin
        '/Availability' //helper
    ];

    // Check if the current path is a dashboard path
    const isDashboardPath = dashboardPaths.includes(location.pathname);

    return (
        <div>
            <Header /> {/* Rendering the Header component */}
            <Outlet /> {/* Rendering the Outlet for nested routes */}
            {!isDashboardPath && <Footer />} {/* Conditionally rendering the Footer component */}
        </div>
    );
};

export default RootLayout;
