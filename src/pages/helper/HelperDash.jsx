import { useSelector } from "react-redux"

const HelperDash = () => {

    const user = useSelector((state) => state.auth.user)
    return (
        <div>
            <h3 className="pb-6 text-2xl text-center">Profile</h3>
            {user ? <h4 className="text-xl text-center">Hi, {user}! This is the helper "1" dashboard.</h4> : null}
        </div>
    )
}

export default HelperDash;