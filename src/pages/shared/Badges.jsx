import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/badges.css';

const Badges = () => {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('http://localhost:8081/badges');
                setBadges(response.data);
            } catch (error) {
                console.error('Error fetching badges:', error);
                setError('Failed to fetch badges. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBadges();
    }, []);

    return (
        <div>
            <h2 className='pb-6 pt-10 text-2xl text-center'>Badges</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="badge-grid">
                    {badges.map(badge => (
                        <div key={badge.badge_id} className="badge-card">
                            <img src={`http://localhost:8081/images/badges/${badge.badge_img}`} alt={badge.badge_name} />
                            <h3>{badge.badge_name}</h3>
                            <p>{badge.badge_info}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Badges;
