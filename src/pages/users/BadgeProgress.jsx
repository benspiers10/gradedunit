import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BadgeProgress = () => {
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem("user_id");

        const fetchBadgeProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/${userId}/badge-progress`);
                console.log(response.data); // Log response data
                setBadges(response.data);
            } catch (error) {
                console.error('Error fetching badge progress:', error);
                setError('Failed to fetch badge progress. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchBadgeProgress();
    }, []); // No dependency array since we only want to run this effect once

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className=" py-10">
            
            <div className="">
                {badges.length > 0 ? (
                    badges.map((badge) => (
                        <div key={badge.badge_id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-2">{badge.badge_name}</h3>
                            <p className="text-gray-700 mb-4">{badge.badge_info}</p>
                            <img src={`http://localhost:8081/images/badges/${badge.badge_img}`} alt={badge.badge_name} className="w-full h-auto mb-4" />
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Progress
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                            {badge.progress_percentage}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                    <div style={{ width: `${badge.progress_percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                </div>
                                <button onClick={() => handlePrintBadge(badge)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Print Badge</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No badges found.</p>
                )}
            </div>
        </div>
    );
};

export default BadgeProgress;
