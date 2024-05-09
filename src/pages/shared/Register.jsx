import React, { useState } from "react";
import './register.css';
// import exp from "constants";

function Register() {

    const [, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandler = e => {
        post('http://localhost:8081/signup', {username: username, password: password, email: email})
        .then((data => {
            console.log(data)
            setUsername('')
            setPassword('')
            setEmail('')
        }))
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h3>Register to help</h3>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="email">E-mail</label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div>
            <button type='button'>Cancel</button>
            <button type='submit'>Submit</button>
        </div>


            </form>
        </div>
    );
}

export default Register;











}