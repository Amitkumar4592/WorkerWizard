// src/components/UserDashboard.js
import React, { useState } from 'react';
import './UserDashboard.css'; // Ensure you have a CSS file for styling

const UserDashboard = ({ userMobile }) => { // Receiving userMobile as a prop
  const [location, setLocation] = useState('');
  const [workers, setWorkers] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();

    // Fetch workers based on the location
    fetch(`http://localhost:5000/api/workers?location=${location}`)
      .then(response => response.json())
      .then(data => {
        if (data.workers.length === 0) {
          setMessage('No workers found in this location.');
        } else {
          setWorkers(data.workers);
          setMessage(''); // Clear previous messages
        }
      })
      .catch(err => {
        console.error('Error fetching workers:', err);
        setMessage('Error fetching workers. Please try again.');
      });
  };

  const handleAssign = (workerId, workerMobile) => {
    console.log("Employer Mobile (userMobile) in assign:", userMobile); // Debugging log

    fetch('http://localhost:5000/api/assign-worker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workerMobile, employerMobile: userMobile }), // Use employerMobile (userMobile)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setMessage(`SMS sent to worker: ${workerMobile}`);
      } else {
        setMessage('Error sending SMS: ' + data.message);
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      setMessage('Error sending SMS. Please try again.');
    });
  };

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Enter location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />
        <button type="submit">Search</button>
      </form>
      
      {workers.length > 0 ? (
        <div className="worker-list">
          <h2>Workers in {location}</h2>
          {workers.map(worker => (
            <div className="worker-card" key={worker._id}>
              <h3>{worker.fullname}</h3>
              <p><strong>Expertise:</strong> {worker.expertise}</p>
              <p><strong>Email:</strong> {worker.email}</p>
              <p><strong>Mobile:</strong> {worker.mobile}</p>
              <p><strong>Location:</strong> {worker.location}</p>
              <button className="assign-button" onClick={() => handleAssign(worker._id, worker.mobile)}>
                Assign
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>{message || 'Enter a location to find workers.'}</p>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserDashboard;
