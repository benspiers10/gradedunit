import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, signin } from './store/authSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import useAutoLogout from './store/autoLogout'; // Importing the useAutoLogout hook
import Home from './pages/shared/Home';
import Register from './pages/shared/Register';
import Login from './pages/shared/Login';
import Dash from './pages/user/Dash';
import ParentDash from './pages/parent/ParentDash';
import AdminDash from './pages/admin/AdminDash';
import HelperDash from './pages/helper/HelperDash';
import Gallery from './pages/shared/Gallery';
import Badges from './pages/shared/Badges';
import Error from './pages/shared/Error';
import RootLayout from './layouts/RootLayout';
import UserList from './pages/admin/UserList';
import EventUpload from './pages/admin/components/EventUpload';
import FileUpload from './pages/components/FileUpload';
import Profile from './pages/shared/Profile';
import Events from './pages/shared/Events';
import EventDetail from './pages/components/EventDetail';
import Availability from './pages/helper/HelperAvailability';
import Training from './pages/helper/HelperTraining';
import RegisterHelper from './pages/parent/RegisterHelper';
import Applications from './pages/admin/Applications';
import HelperAvailabilityList from './pages/admin/components/AvailabilityList';
import UserDetails from './pages/admin/components/UserDetails';
import Games from './pages/shared/Games';
import BadgeProgress from './pages/user/BadgeProgress';
import Footer from './pages/components/Footer';

const App = () => {
    const dispatch = useDispatch();

    // Use the useAutoLogout hook
    useAutoLogout();

    useEffect(() => {
        // Check for token, username, role, and user_id in localStorage on component mount
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        const user_id = localStorage.getItem("user_id");

        if (token && username && role && user_id) {
            // If token, username, role, and user_id exist in localStorage, dispatch signin action
            dispatch(signin.fulfilled({ username, role, token, user_id }));
        } else {
            // If any of token, username, role, or user_id is missing, dispatch logout action
            dispatch(logout());
        }
    }, [dispatch]); // Run the effect only once on component mount

    return (
        <BrowserRouter>
            <Routes>
                {/* Routes for unauthenticated users */}
                <Route path="/Register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                {/* Routes for authenticated users */}
                <Route path="/" element={<RootLayout />}>
                    {/* Main Pages */}
                    <Route index element={<Home />} />
                    {/* Dashboards */}
                    <Route path="/Dash" element={<Dash />} />
                    <Route path="/ParentDash" element={<ParentDash />} />
                    <Route path="/AdminDash" element={<AdminDash />} />
                    <Route path="/HelperDash" element={<HelperDash />} />
                    {/* Other shared routes */}
                    <Route path="/RegisterHelper" element={<RegisterHelper />} />
                    <Route path="/Gallery" element={<Gallery />} />
                    <Route path="/Badges" element={<Badges />} />
                    {/* User and admin routes */}
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="/EventUpload" element={<EventUpload />} />
                    <Route path="/FileUpload" element={<FileUpload />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Games" element={<Games />} />
                    <Route path="/BadgeProgress" element={<BadgeProgress />} />
                    {/* Events */}
                    <Route path="/Events" element={<Events />} />
                    <Route path="/Events/:id" element={<EventDetail />} />
                    {/* Helper routes */}
                    <Route path="/Availability" element={<Availability />} />
                    <Route path="/Training" element={<Training />} />
                    {/* Applications and Availability route for admin */}
                    <Route path="/Applications" element={<Applications />} />
                    <Route path="/AvailabilityList" element={<HelperAvailabilityList />} />
                    <Route path="/UserDetails/:username" element={<UserDetails />} />
                    {/* Error route if page cannot be found */}
                    <Route path="*" element={<Error />} />
                    <Route path="/Footer" element={<Footer />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
