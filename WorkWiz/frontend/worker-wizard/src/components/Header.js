// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ showBackButton }) => (
  <header className="header">
    <div className="container">
      <div className="logo">
        <h1>
          WORKER <span className="highlight">WIZARD</span>
        </h1>
      </div>
      {showBackButton && (
        <nav className="navbar">
          <ul className="navbar-buttons">
            <li>
              <Link to="/getstarted" className="btn">
                Back
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  </header>
);

export default Header;
