import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Nav = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm bg-[#0c76ff]">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Obanshire <span className="font-bold">Scouts</span>
        </h1>
      </div>

      <div className="flex items-center gap-8 ml-10">
        <Link to="/">
          <div>
            <h1>Home</h1>
          </div>
        </Link>

        {loggedIn && (
          <>
            {role === 2 && (
              <>
                <Link to="/AdminDash">
                  <div>
                    <h1>Admin Dashboard</h1>
                  </div>
                </Link>
              </>
            )}

            {role === 1 && (
              <Link to="/HelperDash">
                <div>
                  <h1>Helper Dashboard</h1>
                </div>
              </Link>
            )}

            {role === 0 && (
              <Link to="/Dash">
                <div>
                  <h1>Dashboard</h1>
                </div>
              </Link>
            )}

            <Link to="/gallery">
              <div>
                <h1>Gallery</h1>
              </div>
            </Link>

            <Link className="text-red-500" to="/" onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </>
        )}

        {!loggedIn && (
          <>
            <Link to="/info">
              <div>
                <h1>Whats On</h1>
              </div>
            </Link>

            <Link to="/badges">
              <div>
                <h1>Badges</h1>
              </div>
            </Link>

            <Link to="/register">
              <div>
                <h1>Register</h1>
              </div>
            </Link>

            <Link to="/login">
              <div>
                <h1>Login</h1>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
