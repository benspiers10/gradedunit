import React, { useState } from "react";
import axios from 'axios';
import './register.css';

// import exp from "constants";

function Register() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandler = e => {
        axios.post('http://localhost:8081/signup', {username: username, password: password, email: email })
        .then((data => {
            console.log(data)
            setUsername('')
            setPassword('')
            setEmail('')
            
        }))
    }

    return (
        <div>
            <form className="mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-cyan-400 mt-36 h-84" onSubmit={submitHandler}>
                <h3 className="pb-6 text-2xl text-center">Register to help</h3>
                <label className="block mb-1 text-xl text-cyan-400" htmlFor="username">Username</label>
                <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-red-300" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className="block mb-1 text-xl text-cyan-400" htmlFor="password">Password</label>
                <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-red-300" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label className="block mb-1 text-xl text-cyan-400" htmlFor="email">E-mail</label>
                <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-red-300" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div className="flex justify-between">
            <button className="px-3 py-3 rounded-sm bg-cyan-400" type='button'>Cancel</button>
            <button className="px-3 py-3 rounded-sm bg-cyan-400" type='submit'>Submit</button>
        </div>


            </form>
        </div>
    );
}

export default Register;
