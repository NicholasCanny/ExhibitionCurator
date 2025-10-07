import React from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="container home-main">
        <h1 className="header home-title">Welcome to the Exhibition Curator</h1>
        <p className="home-subtitle">
          Your platform for managing and showcasing exhibitions.
        </p>
        <div className="home-info-box">
          <h2 className="home-section-title">Get Started</h2>
          <ul className="home-list">
            <li>
              <span role="img" aria-label="search">
                🔍
              </span>{" "}
              <strong>Browse</strong> exhibitions from world-class museums
            </li>
            <li>
              <span role="img" aria-label="star">
                ⭐
              </span>{" "}
              <strong>Curate</strong> your own collection
            </li>
          </ul>
        </div>
        <div className="home-features" style={{ marginTop: "2rem" }}>
          <h2 className="home-section-title">How It Works</h2>
          <ul className="home-list">
            <li>Search and filter exhibitions from multiple museums</li>
            <li>Save your favourite artworks to a personal collection</li>
            <li>View images and details for each exhibition</li>
            <li>Your selections are saved for your session</li>
          </ul>
        </div>
        <a href="/exhibitions" className="button">
          Start Exploring
        </a>
        <footer className="footer">
          Powered by Harvard Art Museums & The Met Museum APIs.
          <br />
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
