// src/components/WorkerLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerLogin.css'; // Create this CSS file for styling
import Header from './Header';

const WorkerLogin = () => {
  const [loginInfo, setLoginInfo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send data to backend
    fetch('http://localhost:5000/api/login-worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loginInfo, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate('/worker-dashboard'); // Redirect to worker dashboard or any other page
        } else {
          setErrorMessage('Invalid login credentials. Please try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('An error occurred. Please try again.');
      });
  };

  return (
    <>
      <Header showBackButton />
      <main>
        <section className="worker-login-form">
          <h2>Login as Worker</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="login-info">Mobile/Email:</label>
            <input
              type="text"
              id="login-info"
              name="loginInfo"
              value={loginInfo}
              onChange={(e) => setLoginInfo(e.target.value)}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </section>
      </main>
    </>
  );
};

export default WorkerLogin;
