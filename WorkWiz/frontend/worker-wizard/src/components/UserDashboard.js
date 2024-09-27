// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import './UserDashboard.css'; // Add your own CSS for styling

const UserDashboard = () => {
    const [location, setLocation] = useState('');
    const [workers, setWorkers] = useState([]);
    const [message, setMessage] = useState('');

    const locations = ['Location1', 'Location2', 'Location3']; // Replace with actual locations

    const handleSearch = () => {
        fetch(`http://localhost:5000/api/workers?location=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setWorkers(data.workers);
                    setMessage('');
                } else {
                    setMessage(data.message);
                    setWorkers([]);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Error fetching workers. Please try again.');
                setWorkers([]);
            });
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <div>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                    ))}
                </select>
                <button onClick={handleSearch}>Search Workers</button>
            </div>

            {message && <p>{message}</p>}

            {workers.length > 0 && (
                <div>
                    <h3>Workers in {location}:</h3>
                    <ul>
                        {workers.map(worker => (
                            <li key={worker._id}>
                                <p><strong>Name:</strong> {worker.fullname}</p>
                                <p><strong>Mobile:</strong> {worker.mobile}</p>
                                <p><strong>Email:</strong> {worker.email}</p>
                                <p><strong>Address:</strong> {worker.address}</p>
                                <p><strong>Expertise:</strong> {worker.expertise}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
