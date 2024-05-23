import React, { useState, useEffect } from "react";
import axios from "axios";

function Availability() {
    const [selectedDays, setSelectedDays] = useState([]);
    const [otherHelpers, setOtherHelpers] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const user_id = localStorage.getItem("user_id"); // Retrieve user ID from localStorage
    console.log("User ID from localStorage:", user_id);

    useEffect(() => {
        fetchOtherHelpersAvailability();
    }, []);

    const fetchOtherHelpersAvailability = async () => {
        try {
            const res = await axios.get('http://localhost:8081/availability');
            setOtherHelpers(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch availability. Please try again later.');
        }
    };

    const handleDaySelection = (e) => {
        const day = e.target.value;
        setSelectedDays(prevState => {
            const updatedState = prevState.includes(day) ? prevState.filter(d => d !== day) : [...prevState, day];
            return updatedState;
        });
    };

    const handleSubmit = async () => {
        if (!user_id || selectedDays.length === 0) {
            setError('Please select days to mark as available.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8081/availability', {
                helper_id: user_id, // Use userId instead of helperId
                available_days: selectedDays
            });
            setSuccess('Availability added successfully!');
            setSelectedDays([]);
            fetchOtherHelpersAvailability();
        } catch (err) {
            console.error(err);
            setError('Failed to update availability. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <h2 className="mt-4 mb-2 text-lg font-semibold">Select Your Available Days</h2>
            <div className="flex flex-wrap mb-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <div key={day} className="m-2">
                        <label>
                            <input
                                type="checkbox"
                                value={day}
                                checked={selectedDays.includes(day)}
                                onChange={handleDaySelection}
                            />
                            <span className="ml-2">{day}</span>
                        </label>
                    </div>
                ))}
            </div>
            <button className="px-4 py-2 rounded bg-cyan-400 text-white mb-4" onClick={handleSubmit}>
                Submit Availability
            </button>
            <h2 className="mb-2 text-lg font-semibold">Other Helpers' Availability</h2>
            <div className="flex flex-col items-start">
                {otherHelpers.map(helper => (
                    <div key={helper.helper_id} className="mb-2">
                        <p className="mb-1">
                            <span className="font-semibold">{helper.username}:</span> {Array.isArray(helper.available_days) ? helper.available_days.join(', ') : helper.available_days}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Availability;
