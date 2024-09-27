// src/components/WorkerLogin.js
import React, { useState } from 'react';
import './WorkerLogin.css'; // Add your own CSS for styling

const WorkerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/api/login-worker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setMessage(data.message);
                // Redirect or perform any other actions on successful login
            } else {
                setMessage(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage('Error logging in. Please try again.');
        });
    };

    return (
        <div>
            <h2>Worker Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default WorkerLogin;
