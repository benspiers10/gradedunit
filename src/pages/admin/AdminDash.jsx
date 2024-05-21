import { useSelector } from "react-redux"

const AdminDash = () => {

    const user = useSelector((state) => state.auth.user)
    return (
        <div>
            <h3 className="pb-6 text-2xl text-center">Profile</h3>
            {user ? <h4 className="text-xl text-center">Hi, {user}! This is the admin "2" dashboard. </h4> : null}

            <h1 className="pb-6 pt-10 text-2xl text-center">User list link</h1>

            <h1 className="pb-6 pt-10 text-2xl text-center">Adding events</h1>

            <p className="pb-6 text-center"> I wish for all of these to be links/buttons</p>
        </div>
    )
}

export default AdminDash;