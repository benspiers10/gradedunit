import Nav from "../pages/components/Nav";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return(
        <div>
            <Nav />
            <Outlet />
        </div>
    )
}