import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [file, setFile] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/users/${username}`);
                setProfile(response.data);
            } catch (error) {
                setError('Error fetching profile');
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', profile.email);
        formData.append('username', profile.username);
        
        if (file) {
            formData.append('profileImage', file);
        }

        formData.append('firstname', profile.firstname);
        formData.append('surname', profile.surname);
        formData.append('address', profile.address);
        formData.append('phone', profile.phone);

        try {
            const response = await axios.put(`http://localhost:8081/users/${username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setProfile(response.data);
            setEditMode(false);
        } catch (error) {
            setError('Error updating profile');
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <img 
                src={`http://localhost:8081/${profile.img_path}`} 
                alt="Profile" 
                className="profile-image" 
            />
            {editMode ? (
                <form onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        value={profile.username} 
                        onChange={handleInputChange} 
                        placeholder="Username" 
                        disabled
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={profile.email} 
                        onChange={handleInputChange} 
                        placeholder="Email" 
                        disabled
                    />
                    <input 
                        type="text" 
                        name="firstname" 
                        value={profile.firstname || ''} 
                        onChange={handleInputChange} 
                        placeholder="First Name" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="surname" 
                        value={profile.surname || ''} 
                        onChange={handleInputChange} 
                        placeholder="Surname" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="address" 
                        value={profile.address || ''} 
                        onChange={handleInputChange} 
                        placeholder="Address" 
                        required 
                    />
                    <input 
                        type="number" 
                        name="phone" 
                        value={profile.phone || ''} 
                        onChange={handleInputChange} 
                        placeholder="Phone" 
                        required 
                    />
                    <input 
                        type="file" 
                        name="profileImage" 
                        onChange={handleFileChange} 
                    />
                    <button type="submit" className="profile-btn">Save</button>
                    <button type="button" className="profile-btn" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <p>Full Name: {profile.firstname} {profile.surname}</p>
                    <p>Address: {profile.address}</p> 
                    <p>Phone: {profile.phone}</p> 
                    <p>Role: {profile.role === 3 ? 'Admin' : profile.role === 2 ? 'Helper' : profile.role === 1 ? 'Parent' : 'Scout'}</p>
                    <button className="profile-btn" onClick={() => setEditMode(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default Profile;
