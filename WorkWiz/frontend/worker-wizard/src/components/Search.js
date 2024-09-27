// src/components/Search.js
import React, { useState } from 'react';
import './Search.css';
import Header from './Header';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch search results from backend
    fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Header />
      <main>
        <section className="search-section">
          <h2>Search for Workers</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="searchQuery"
              name="searchQuery"
              placeholder="Enter location or expertise"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button type="submit">Search</button>
          </form>

          <div id="results">
            {results.length > 0 ? (
              results.map((worker) => (
                <div key={worker.id} className="worker-card">
                  <h3>{worker.name}</h3>
                  <p>Expertise: {worker.expertise}</p>
                  <p>Location: {worker.location}</p>
                  <p>
                    Contact: {worker.mobile} / {worker.email}
                  </p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Search;
