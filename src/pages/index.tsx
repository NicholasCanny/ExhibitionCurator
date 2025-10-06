import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="container home-main">
        <h1 className="header home-title">Welcome to the Exhibition Curator</h1>
        <p className="home-subtitle">Your platform for managing and showcasing exhibitions.</p>
        <div className="home-info-box">
          <h2 className="home-section-title">Get Started</h2>
          <ul className="home-list">
            <li><span role="img" aria-label="search">🔍</span> <strong>Browse</strong> exhibitions from world-class museums</li>
            <li><span role="img" aria-label="star">⭐</span> <strong>Curate</strong> your own collection</li>
            <li><span role="img" aria-label="rocket">🚀</span> <strong>Share</strong> your exhibition ideas</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default HomePage;