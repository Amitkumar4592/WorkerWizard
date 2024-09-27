// src/components/RegisterUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterUser.css';
import Header from './Header';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please try again.');
    } else {
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/register-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data); // Log the response for debugging
            if (data.success) {
                navigate('/success');
            } else {
                setErrorMessage(data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage('An error occurred. Please try again.');
        }
    }
};


  return (
    <>
      <Header showBackButton />
      <main>
        <section className="registration-form">
          <h2>Register as a User</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </section>
      </main>
    </>
  );
};

export default RegisterUser;
