import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
    // Extracting event id from URL parameters
    const { id } = useParams();

    // State variables to manage event data, loading state, and errors
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch event data from the server using useEffect
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                setError('Error fetching event');
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]); // Fetch event data whenever the id changes

    // Function to format date string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date using browser's locale
    };

    // Render loading message while data is being fetched
    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    // Render error message if there was an error fetching the event
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    // Render event details once data is fetched
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4 lg:px-20">
                <article className="bg-white rounded-lg shadow-md p-6 lg:p-10">
                    {/* Event header with title, location, and date */}
                    <header className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
                        <p className="text-gray-600">
                            <span className="block mb-1"><strong>Location:</strong> {event.location}</span>
                            <span><strong>Date:</strong> {formatDate(event.date)}</span>
                        </p>
                    </header>
                    {/* Event image */}
                    <img 
                        src={`http://localhost:8081/${event.eve_img}`} 
                        alt={event.title} 
                        className="w-full h-96 object-cover rounded-md mb-8"
                    />
                    {/* Event content */}
                    <section className="prose max-w-none">
                        <p className="text-gray-800">{event.content}</p>
                    </section>
                </article>
            </div>
        </div>
    );
};

export default EventDetail;
