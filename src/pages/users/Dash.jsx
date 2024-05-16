import { useSelector } from "react-redux"
import FileUpload from "../components/FileUpload";

const Dash = () => {

    const user = useSelector((state) => state.auth.user)
    return (
        <div>
            <h3 className="pb-6 text-2xl text-center">Profile</h3>
            {user ? <h4 className="text-xl text-center">Hi, {user}!, This is the scout "0" dashboard. </h4> : null}

            <h3 className="pb-6 text-2xl text-center">Upload to the gallery here</h3>
            <FileUpload />
        </div>
    )
}

export default Dash;