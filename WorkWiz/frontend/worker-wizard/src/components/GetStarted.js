// src/components/GetStarted.js
import React from 'react';
import { Link } from 'react-router-dom';
import './GetStarted.css';
import Header from './Header';

const GetStarted = () => (
  <>
    <Header />
    <nav className="navbar">
      <ul className="navbar-buttons">
        <li className="dropdown">
          <span className="btn">Register</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/register-worker">As Worker</Link>
            </li>
            <li>
              <Link to="/register-user">As User</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <span className="btn">Login</span>
          <ul className="dropdown-content">
          
            <li>
              <Link to="/login-user">As User</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </>
);

export default GetStarted;
