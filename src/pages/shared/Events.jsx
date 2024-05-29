import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom'; // Import Link for navigation

// Events component
const Events = () => {
    // State variables for managing events data, loading status, and errors
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect hook to fetch events data on component mount
    useEffect(() => {
        // Function to fetch events
        const fetchEvents = async () => {
            try {
                setLoading(true); // Set loading state to true
                const response = await axios.get('http://localhost:8081/events'); // Fetch events from API
                setEvents(response.data); // Set events state with fetched data
            } catch (error) {
                setError('Failed to fetch events. Please try again later.'); // Set error state if fetching fails
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchEvents(); // Call fetchEvents function
    }, []);

    // Function to format date string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date using browser's locale
    };

    // JSX rendering
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Events</h2>
            {/* Render loading message, error message, or events */}
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Map over events and render each event */}
                        {events.map(event => (
                            <div key={event.event_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img 
                                    src={`http://localhost:8081/${event.eve_img}`} 
                                    alt={event.title} 
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-2">{event.location}</p>
                                    <p className="text-gray-600 mb-4">Date: {formatDate(event.date)}</p>
                                    {/* Link to individual event page */}
                                    <Link 
                                        to={`/events/${event.event_id}`} 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events; // Export Events component
