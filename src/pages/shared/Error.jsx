import React from 'react'; // Import React

// Error component
export default function Error() {
    // JSX rendering
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Page Not Found</p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">Sorry, the page you are looking for could not be found.</p>
            </div>
        </div>
    );
}
