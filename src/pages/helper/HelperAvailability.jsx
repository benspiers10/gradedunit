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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <h2 className="text-2xl font-bold mb-6">Select Your Available Days</h2>
            <div className="flex flex-wrap justify-center mb-6">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <div key={day} className="m-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                value={day}
                                checked={selectedDays.includes(day)}
                                onChange={handleDaySelection}
                                className="form-checkbox text-blue-500"
                            />
                            <span className="ml-2 text-lg">{day}</span>
                        </label>
                    </div>
                ))}
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSubmit}>
                Submit Availability
            </button>
            <h2 className="text-2xl font-bold mt-8 mb-4">Other Helpers' Availability</h2>
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
                {otherHelpers.map(helper => (
                    <div key={helper.helper_id} className="mb-4">
                        <p className="text-lg font-semibold">{helper.username}:</p>
                        <p>{Array.isArray(helper.available_days) ? helper.available_days.join(', ') : helper.available_days}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Availability;
