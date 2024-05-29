import React from "react";
import Logo from './assets/images/scoutslogo.png'
import { useState } from "react";
import { Fade as Hamburger } from 'hamburger-react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Header = () => {
  // Retrieve login status and role from Redux store
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // State to manage mobile menu visibility
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Toggle mobile menu visibility
  const handleToggle = () => {
    setOpen(!isOpen);
  };

  // Render navigation for mobile menu
  const renderMobileNav = () => (
    <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="flex flex-col gap-3 items-center py-20">
        {loggedIn ? (
          <>
            {role === 3 && <Link to="/AdminDash">Admin Dashboard</Link>}
            {role === 2 && <Link to="/HelperDash">Helper Dashboard</Link>}
            {role === 1 && <Link to="/ParentDash">Dashboard</Link>}
            {role === 0 && <Link to="/Dash">Dashboard</Link>}
            <Link to="/Gallery">Gallery</Link>
            <Link to="/Badges">Badges</Link>
            <Link className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded" to="/" onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/Events">Whats On</Link>
            <Link to="/Gallery">Gallery</Link>
            <Link to="/Badges">Badges</Link>
            <Link to="/Register"><button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">Register</button></Link>
            <Link to="/Login"><button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">Login</button></Link>
          </>
        )}
      </div>
    </div>
  );

  // Render navigation for desktop/laptop screens
  const renderDesktopNav = () => (
    <div className="hidden md:flex md:flex-row md:justify-end md:items-center space-x-7">
      {loggedIn ? (
        <>
          {role === 3 && <Link to="/AdminDash">Admin Dashboard</Link>}
          {role === 2 && <Link to="/HelperDash">Helper Dashboard</Link>}
          {role === 1 && <Link to="/ParentDash">Dashboard</Link>}
          {role === 0 && <Link to="/Dash">Dashboard</Link>}
          <Link to="/Gallery">Gallery</Link>
          <Link to="/Badges">Badges</Link>
          <Link className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded" to="/" onClick={() => dispatch(logout())}>
              Logout
            </Link>
        </>
      ) : (
        <>
          <Link to="/Events">Whats On</Link>
          <Link to="/Gallery">Gallery</Link>
          <Link to="/Badges">Badges</Link>
          <Link to="/Register"><button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">Register</button></Link>
          <Link to="/Login"><button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded">Login</button></Link>
        </>
      )}
    </div>
  );

  return (
    <nav className="w-full text-black p-4 shadow-sm bg-gray-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex md:items-center justify-between">
        <Link to='/'>
          <img className="h-20" src={Logo} alt="Scouts Logo" />
        </Link>


        {renderMobileNav()}
        {renderDesktopNav()}
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={handleToggle} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
