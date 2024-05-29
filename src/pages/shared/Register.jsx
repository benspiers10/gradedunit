import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/authSlice";
import RedirectComponent from "../components/RedirectComponent";
import Logo from "../components/assets/images/scoutslogo.png";
import { Link } from "react-router-dom";

function Register() {
    // State variables for form inputs and checkbox
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [roleChecked, setRoleChecked] = useState(false);

    // Selecting user and error from Redux store
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.auth.error);
    const dispatch = useDispatch();

    // Form submission handler
    const submitHandler = (e) => {
        e.preventDefault();
        // Convert roleChecked boolean to 1 or 0 for backend
        const role = roleChecked ? 1 : 0;
        // Dispatch signup action with form data
        dispatch(signup({ username, password, email, role }))
            .then(() => {
                // Reset form inputs and checkbox
                setUsername('');
                setPassword('');
                setEmail('');
                setRoleChecked(false);
            });
    };

    // Checkbox change handler
    const handleCheckboxChange = (e) => {
        setRoleChecked(e.target.checked);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <Link to='/'>
                        <img
                            src={Logo}
                            className="w-full"
                            alt="Scouts Logo"
                        />
                    </Link>
                </div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" onSubmit={submitHandler}>
                    <h2 className="text-2xl text-center font-bold mb-8 text-gray-800">Register</h2>
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
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    {/* Password input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    {/* Email input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    {/* Checkbox for role */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Parent/Guardian?</label>
                        <input
                            className="p-1 leading-tight focus:outline-none"
                            type="checkbox"
                            name="role"
                            id="role"
                            checked={roleChecked}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    {/* Submit button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    {/* Error message */}
                    {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    {/* Redirect if user is logged in */}
                    {user && <RedirectComponent />}
                    {/* Link to login page */}
                    <p className="text-sm">Already have an account? <Link to="/Login" className="text-blue-500 hover:underline">Log in here</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
