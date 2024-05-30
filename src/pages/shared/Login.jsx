import React, { useState } from "react"; // React core library
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for accessing store state and dispatching actions
import { signin } from "../../store/authSlice"; // Import signin action creator from authSlice
import RedirectComponent from "../components/RedirectComponent"; // Import RedirectComponent for redirecting after successful login
import Logo from "../components/assets/images/scoutslogo.png"; // Import logo image
import { Link } from "react-router-dom"; // Import Link component for routing

// Login component
function Login() {
    // State variables to manage username, password, user data, and error message
    const [username, setUsername] = useState(''); // Username state
    const [password, setPassword] = useState(''); // Password state
    const user = useSelector((state) => state.auth.user); // User data from Redux store
    const error = useSelector((state) => state.auth.error); // Error message from Redux store
    const dispatch = useDispatch(); // Dispatch function for dispatching actions

    // Function to handle form submission
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(signin({ username, password })).then(() => {
            setUsername(''); // Clear username state after form submission
            setPassword(''); // Clear password state after form submission
        });
    };

    // Render login form
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* Left column container with background */}
            <div className="g-6 flex flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    {/* Logo image */}
                    <Link to='/'>
                        <img
                            src={Logo}
                            className="w-full"
                            alt="logo"
                        />
                    </Link>
                </div>
                {/* Sign-in form */}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" onSubmit={submitHandler}>
                    {/* Sign-in form title */}
                    <h2 className="text-2xl text-center font-bold mb-8 text-gray-800">Sign In</h2>
                    {/* Username input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="username"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                            placeholder="Enter your username"
                        />
                    </div>
                    {/* Password input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                            placeholder="Enter your password"
                        />
                    </div>
                    {/* Sign-in button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                    {/* Error message display */}
                    {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    {/* Redirect after successful login */}
                    {user && <RedirectComponent />}
                    {/* Link to registration page */}
                    <div className="text-center mt-4">
                        <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login; // Export Login component
