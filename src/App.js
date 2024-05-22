import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, signin } from './store/authSlice';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import axios from 'axios';
import './App.css';
import Home from './pages/shared/Home';
import Register from './pages/shared/Register';
import Login from './pages/shared/Login';
import Dash from './pages/users/Dash';
import AdminDash from './pages/admin/AdminDash';
import HelperDash from './pages/helper/HelperDash';
import Gallery from './pages/shared/Gallery';
import Badges from './pages/shared/Badges';
import Error from './pages/shared/Error';
import RootLayout from './layouts/RootLayout';
import UserList from './pages/admin/UserList';
import EventUpload from './pages/admin/EventUpload';
import FileUpload from './pages/components/FileUpload';
import Profile from './pages/shared/Profile';

const App = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        // Check for token on page load
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        if (token && username && role) {
          // Set user as authenticated with username and role
          dispatch(signin.fulfilled({ username, role, token }));
        } else {
          // User is not authenticated
          // Dispatch an action to logout
          dispatch(logout());
        }
      }, [dispatch]); // Run the effect only once on component mount
    

    return (
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dash" element={<Dash />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/HelperDash" element={<HelperDash />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Badges" element={<Badges />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/EventUpload" element={<EventUpload />} />
          <Route path="/FileUpload" element={<FileUpload />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
         </Route>
         </Routes>
        </BrowserRouter>

        
    );
  };
  export default App;