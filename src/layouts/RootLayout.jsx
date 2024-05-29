import Header from "../pages/components/Header"; // Importing the Header component
import { Outlet } from "react-router-dom"; // Importing Outlet for nested routing

// Component for the root layout of the application
export default function RootLayout() {
    return (
        <div>
            <Header /> {/* Rendering the Header component */}
            <Outlet /> {/* Rendering the Outlet for nested routes */}
        </div>
    );
}
