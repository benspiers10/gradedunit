import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8081/events');
                setEvents(response.data);
            } catch (error) {
                setError('Failed to fetch events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="events-list-container">
            <h2 className='pb-6 pt-10 text-2xl text-center'>Events</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="events-list">
                    {events.map(event => (
                        <div key={event.event_id} className="event-card">
                            <img src={`http://localhost:8081/${event.eve_img}`} alt={event.title} className="event-image" />
                            <h3>{event.title}</h3>
                            <p>{event.location}</p>
                            <Link to={`/events/${event.event_id}`} className="read-more-button">Read More</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
