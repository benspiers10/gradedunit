import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/badges.css';

const Badges = () => {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedBadgeId, setExpandedBadgeId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Function to toggle expansion of badge card
    const toggleExpansion = (badgeId) => {
        setExpandedBadgeId(prevId => (prevId === badgeId ? null : badgeId));
    };

    // Function to handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter badges based on search term
    const filteredBadges = badges.filter(badge =>
        badge.badge_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className='pb-6 pt-10 text-2xl text-center'>Badges</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search badges..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="badge-grid">
                    {filteredBadges.map(badge => (
                        <div key={badge.badge_id} className="badge-card">
                            <img src={`http://localhost:8081/images/badges/${badge.badge_img}`} alt={badge.badge_name} />
                            <h3 className='text-xl text-center'>{badge.badge_name}</h3>
                            {expandedBadgeId === badge.badge_id && (
                                <div>
                                    <p>{badge.badge_info}</p>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => toggleExpansion(badge.badge_id)}>Hide Description</button>
                                </div>
                            )}
                            {expandedBadgeId !== badge.badge_id && (
                                <div>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10' onClick={() => toggleExpansion(badge.badge_id)}>Description</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Badges;
