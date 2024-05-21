import { useState } from "react";
import { signin } from "../../store/authSlice";
import '../shared/css/login.css';
import { useDispatch, useSelector } from "react-redux";
import RedirectComponent from "../components/RedirectComponent";

// import exp from "constants";

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector((state) => state.auth.user)
    const error = useSelector((state) => state.auth.error)
    const dispatch = useDispatch()

    const submitHandler = e => {
        e.preventDefault()
        dispatch(signin({username, password}))
        .then(() => {
            setUsername('')
            setPassword('')
        })
    }

    return (
        <div>
            <form className="mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-cyan-400 mt-36 h-84" onSubmit={submitHandler}>
                <h3 className="pb-6 text-2xl text-center">Sign In</h3>
                <label className="block mb-1 text-xl text-cyan-400" htmlFor="username">Username</label>
                <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-red-300" type="text" name="username" id="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className="block mb-1 text-xl text-cyan-400" htmlFor="password">Password</label>
                <input className="w-full h-8 p-1 mb-6 focus:outline-none bg-red-300" type="password" name="password" id="password" required  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className="flex justify-between"> 
            <button className="w-full px-3 py-3 rounded-sm bg-cyan-400" type='submit'>Sign In</button>
            </div>
            {error ? <p className="pb-6 text-2xl text-center text-red-600">{error}</p> : null}
            {user ? <RedirectComponent /> : null}
            </form>

        </div>
    );
}

export default Login;
