import React from "react";
import { Link } from "react-router-dom"; 
// import UserInfo from '../components/UserInfo'
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";


const Nav = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-[#0c76ff]">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Obanshire <span className="font-bold">Scouts</span>
        </h1>
      </div>

        { loggedIn ? 
          <div className="flex items-center gap-8 ml-10">
                <Link to="/">
                <div>
                <h1>Home</h1>
                </div>
                </Link>

                <Link to="/Profile">
                <div>
                <h1>Profile</h1>
                </div>
                </Link>

                <Link to="/Gallery">
                <div>
                <h1>Gallery</h1>
                </div>
                </Link>

                <Link className="pl-20 color-red-500" to="/"onClick={() => dispatch(logout())}>
                Logout
                </Link>
          </div>

            :

          <div className="flex items-center gap-8 ml-10">
                <Link to="/">
                <div>
                <h1>Home</h1>
                </div>
                </Link>

                <Link to="/Info">
                <div>
                <h1>Whats On</h1>
                </div>
                </Link>

                <Link to="/Badges">
                <div>
                <h1>Badges</h1>
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

  );
};

export default Nav;