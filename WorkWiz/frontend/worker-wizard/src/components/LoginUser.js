// src/components/LoginUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginUser = ({ setUserMobile }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    // Make login request to the backend
    const response = await fetch('http://localhost:5000/api/login-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log('Login response:', data); // Log the entire response from the backend

    if (data.success) {
      // Get the userMobile from the response
      const userMobile = data.userMobile; 
      console.log("User Mobile from login:", userMobile); // Log the mobile number for debugging

      if (userMobile) {
        // Set the mobile number in the App state
        setUserMobile(userMobile);

        // Navigate to the user dashboard
        navigate('/user-dashboard');
      } else {
        alert('Login successful, but no mobile number returned');
      }
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div>
      <h1>Login User</h1>
      <form onSubmit={handleLogin}>
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
    </div>
  );
};

export default LoginUser;
