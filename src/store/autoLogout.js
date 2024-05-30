import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice'; // Assuming this is the path to your authSlice file

const useAutoLogout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        let timer;
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

        const logoutUser = () => {
            dispatch(logout()); // Dispatch the logout action to clear user data
            localStorage.removeItem('token'); // Remove the login token from localStorage
        };

        // Set timeout to logout the user after 30 minutes
        timer = setTimeout(logoutUser, thirtyMinutes);

        // Clean up the timer on component unmount
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch]);
};

export default useAutoLogout;
