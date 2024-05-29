// RedirectComponent.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectComponent = ({ to }) => {
    // Get user role from Redux store
    const role = useSelector((state) => state.auth.role);

    // Log user role on role change
    useEffect(() => {
        console.log(`User role: ${role}`);
    }, [role]);

    // Redirect based on user role
    switch (role) {
        case 3 :
            return <Navigate to="/AdminDash" />;
        case 2:
            return <Navigate to="/HelperDash" />;
        case 1:
            return <Navigate to="/ParentDash" />;
        case 0:
            return <Navigate to="/Dash" />;
        default:
            return <Navigate to={to} />;
    }
};

export default RedirectComponent;
