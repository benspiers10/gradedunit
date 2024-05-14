import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import axios from 'axios';
import './App.css';
import Home from './pages/shared/Home';
import Register from './pages/shared/Register';
import Profile from './pages/users/UserDash';
import Login from './pages/shared/Login';
import Error from './pages/shared/Error';
import RootLayout from './layouts/RootLayout';

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
          {/* <Route path="/Dash" element={<Dash />} />
          <Route path="/ParentDash" element={<ParentDash />} />
          <Route path="/Department" element={<Department />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Games" element={<Games />} /> */}
         </Route>
         </Routes>
        </BrowserRouter>

        
    );
  };
  export default App;