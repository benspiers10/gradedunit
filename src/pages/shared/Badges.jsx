import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/badges.css';
import { Link } from 'react-router-dom';


const Badges = () => {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedBadge, setSelectedBadge] = useState(null);
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

    // Function to handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePrintBadge = (badge) => {
        // Create a string with badge information
        const badgeInfo = `
            <div style="text-align: center;">
                <h3>${badge.badge_name}</h3>
                <img src="http://localhost:8081/images/badges/${badge.badge_img}" alt="${badge.badge_name}" style="max-width: 200px; max-height: 200px;">
                <p>${badge.badge_info}</p>
            </div>
        `;

        // Open a new window and print the badge information
        const printWindow = window.open('', '_blank');
        printWindow.document.write(badgeInfo);
        printWindow.document.close();
        printWindow.print();
    };
    
    // Filter badges based on search term
    const filteredBadges = badges.filter(badge =>
        badge.badge_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to open modal with selected badge
    const openModal = (badge) => {
        setSelectedBadge(badge);
    };

    // Function to close modal
    const closeModal = () => {
        setSelectedBadge(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="bg-blue-600 text-white py-6 mb-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-2">Welcome to Scouts Badges</h2>
                    <p className="mb-4">
                        Being a scout is an adventure filled with learning, achievement, and fun. 
                        Earning badges is a great way to track your progress and accomplishments.
                    </p>
                    <p className="mb-4">
                        Each badge represents a new skill or knowledge area that you've mastered. 
                        Keep striving and earn as many as you can!
                    </p>
                    <Link to='/Login'>
                    <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded mt-4 hover:bg-gray-200">
                        Log in to view your progress
                    </button></Link>
                </div>
            </div>
            <h2 className="pb-6 text-3xl text-center text-gray-800">Badges</h2>
            <div className="flex justify-center mb-8">
                <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Search badges..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredBadges.map(badge => (
                            <div key={badge.badge_id} className="bg-white rounded-lg shadow-md p-6">
                                <img 
                                    src={`http://localhost:8081/images/badges/${badge.badge_img}`} 
                                    alt={badge.badge_name} 
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl text-center text-gray-800 mb-2">{badge.badge_name}</h3>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                                    onClick={() => openModal(badge)}
                                >
                                    Description
                                </button>
                                <button onClick={() => handlePrintBadge(badge)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">Print Badge</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedBadge && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
                        <h3 className="text-2xl text-center text-gray-800 mb-4">{selectedBadge.badge_name}</h3>
                        <p className="text-gray-600 mb-4">{selectedBadge.badge_info}</p>
                        <button 
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Badges;
