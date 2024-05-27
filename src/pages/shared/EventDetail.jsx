import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [id]);

    // Function to format date string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date using browser's locale
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4 lg:px-20">
                <article className="bg-white rounded-lg shadow-md p-6 lg:p-10">
                    <header className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
                        <p className="text-gray-600">
                            <span className="block mb-1"><strong>Location:</strong> {event.location}</span>
                            <span><strong>Date:</strong> {formatDate(event.date)}</span>
                        </p>
                    </header>
                    <img 
                        src={`http://localhost:8081/${event.eve_img}`} 
                        alt={event.title} 
                        className="w-full h-96 object-cover rounded-md mb-8"
                    />
                    <section className="prose max-w-none">
                        <p className="text-gray-800">{event.content}</p>
                    </section>
                </article>
            </div>
        </div>
    );
};

export default EventDetail;
