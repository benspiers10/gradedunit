import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './pages/shared/Home';
import Register from './pages/shared/Register';

const App = () => {
    return (
        <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register/>} />
          {/* <Route path="/Dash" element={<Dash />} />
          <Route path="/ParentDash" element={<ParentDash />} />
          <Route path="/Department" element={<Department />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Games" element={<Games />} /> */}
         </Routes>
        </BrowserRouter>
    );
  };
  export default App;