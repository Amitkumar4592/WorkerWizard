// src/components/Success.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Success.css';
import Header from './Header';

const Success = () => (
  <>
    <Header showBackButton />
    <main>
      <section className="success-message">
        <h2>Registration Successful!</h2>
        <p>
          Thank you for registering. Your details have been saved successfully.
        </p>
        <Link to="/" className="btn">
          Go to Homepage
        </Link>
      </section>
    </main>
  </>
);

export default Success;
