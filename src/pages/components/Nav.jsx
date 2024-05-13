import React, { useState } from "react";
import { Link } from "react-router-dom"; 
// import UserInfo from '../components/UserInfo'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

import { FaHome } from "react-icons/fa";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()


  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-[#75B9BE]">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Obanshire <span className="font-bold">Scouts</span>
        </h1>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-navigation/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4 bg-navigation">
          Obanshire <span className="font-bold">Scouts</span>
        </h2>

        { loggedIn ? 
        <div>
            <Link to="/">
              <div className="flex items-center gap-5 ml-10">
                <h1>Home</h1>
                </div>
                </Link>

                <Link to="/Profile">
                <div>
                <h1>Profile</h1>
                </div>
                </Link>

                <Link className="pl-20 color-red-500" to="/"onClick={() => dispatch(logout())}>
                Logout
                </Link>
          </div>

                :

                <div>
                <Link to="/">
          <div className="flex items-center gap-5 ml-10">
          <FaHome size={50}/>
          <h1>Home</h1>
          </div>
          </Link>

          <Link to="/Register">
          <div>
          <h1>Register</h1>
          </div>
          </Link>

          <Link to="/Login">
          <div>
          <h1>Login</h1>
          </div>
          </Link>
          
          </div>
         }



      </div>
    </div>
  );
};

export default Nav;