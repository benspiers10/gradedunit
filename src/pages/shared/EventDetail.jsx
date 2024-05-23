import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/eventdetail.css';

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="event-detail-container">
            <h2 className="event-title">{event.title}</h2>
            <img src={`http://localhost:8081/${event.eve_img}`} alt={event.title} className="event-image" />
            <p>{event.content}</p>
            <p>Location: {event.location}</p>
        </div>
    );
};

export default EventDetail;
