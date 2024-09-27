// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
//import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="hero-section">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2>Connecting Skilled Workers with the Right Opportunities</h2>
                        <ul>
                            <li>Find skilled professionals for your needs.</li>
                            <li>Directly connect with the best talent available in your area.</li>
                            <li>Offer your services and showcase your expertise.</li>
                            <li>Simplify your search with our user-friendly platform.</li>
                        </ul>
                        <Link to="/getstarted" className="btn getstarted" id="get-started-btn">Get Started</Link>
                    </div>
                    <div className="hero-image">
                        <img src="https://i.ibb.co/bN3SCvh/worker-image.jpg" alt="Workers Image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
