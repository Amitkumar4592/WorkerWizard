import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterWorker.css';
import Header from './Header';

const RegisterWorker = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    expertise: '',
    location: '',
    password: '',
    confirmPassword: '',
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
        const response = await fetch('http://localhost:5000/api/register-worker', {
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
          <h2>Register as a Worker</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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

            <label htmlFor="expertise">Work Expertise:</label>
            <input
              type="text"
              id="expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              required
            />

            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
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

            <button type="submit">Register</button>
          </form>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </section>
      </main>
    </>
  );
};

export default RegisterWorker;
