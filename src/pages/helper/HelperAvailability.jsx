import React, { useState, useEffect } from "react";
import axios from "axios";

function Availability() {
    // State variables
    const [selectedDays, setSelectedDays] = useState([]); // Selected days for availability
    const [otherHelpers, setOtherHelpers] = useState([]); // Other helpers' availability
    const [error, setError] = useState(null); // Error message
    const [success, setSuccess] = useState(null); // Success message
    const [canSubmit, setCanSubmit] = useState(true); // Can submit availability

    // Retrieve user ID from localStorage
    const user_id = localStorage.getItem("user_id");
    console.log("User ID from localStorage:", user_id);

    // Fetch other helpers' availability on component mount
    useEffect(() => {
        fetchOtherHelpersAvailability();
        checkUserAvailability();
    }, []);

    // Function to fetch other helpers' availability
    const fetchOtherHelpersAvailability = async () => {
        try {
            const res = await axios.get('http://localhost:8081/availability');
            setOtherHelpers(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch availability. Please try again later.');
        }
    };

    // Function to check if the user has already posted availability
    const checkUserAvailability = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/availability/${user_id}`);
            if (res.data.length > 0) {
                setCanSubmit(false); // User already has availability set
                setError('You have already posted your availability.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to check your availability. Please try again later.');
        }
    };

    // Function to handle day selection
    const handleDaySelection = (e) => {
        const day = e.target.value;
        setSelectedDays(prevState => {
            const updatedState = prevState.includes(day) ? prevState.filter(d => d !== day) : [...prevState, day];
            return updatedState;
        });
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        // Validate user ID and selected days
        if (!user_id || selectedDays.length === 0) {
            setError('Please select days to mark as available.');
            return;
        }

        try {
            // Send availability data to the server
            const res = await axios.post('http://localhost:8081/availability', {
                helper_id: user_id,
                available_days: selectedDays
            });
            setSuccess('Availability added successfully!');
            setSelectedDays([]);
            fetchOtherHelpersAvailability(); // Fetch other helpers' availability after submission
        } catch (err) {
            console.error(err);
            setError('Failed to update availability. Please try again later.');
        }
    };

    // Component rendering
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            {/* Error and success messages */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            {/* Title */}
            <h2 className="text-2xl font-bold mb-6">Select Your Available Days</h2>
            {/* Checkbox for each day of the week */}
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
                                disabled={!canSubmit} // Disable checkbox if user already posted availability
                            />
                            <span className="ml-2 text-lg">{day}</span>
                        </label>
                    </div>
                ))}
            </div>
            {/* Submit button */}
            <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
                disabled={!canSubmit} // Disable button if user already posted availability
            >
                Submit Availability
            </button>
            {/* Other helpers' availability */}
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
