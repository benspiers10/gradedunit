import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../store/authSlice";
import RedirectComponent from "../components/RedirectComponent";
import Logo from "../components/assets/images/scoutslogo.png";
import { Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.auth.error);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin({ username, password })).then(() => {
            setUsername('');
            setPassword('');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {/* <!-- Left column container with background--> */}
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <Link to='/'>
                        <img
                            src={Logo}
                            className="w-full"
                            alt="Logo image"
                        />
                    </Link>
                </div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80" onSubmit={submitHandler}>
                    <h2 className="text-2xl text-center font-bold mb-8 text-gray-800">Sign In</h2>
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
                    <div className="mb-6">
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
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
                    {user && <RedirectComponent />}
                    <div className="text-center mt-4">
                    <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link></p>
                </div>
                </form>
                
            </div>
        </div>
    );
}

export default Login;
