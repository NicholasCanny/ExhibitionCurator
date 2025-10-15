import Navbar from "../components/Navbar";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home - Exhibition Curator";
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container home-main" aria-label="Home page main content">
        <h1 className="header home-title">Welcome to the Exhibition Curator</h1>
        <p className="home-subtitle">
          Your platform for managing and showcasing exhibitions.
        </p>
        <div className="home-info-box">
          <h2 className="home-section-title">How It Works</h2>
          <ul className="home-list">
            <li>
              <span role="img" aria-label="search">
                🔍
              </span>{" "}
              <strong>Browse</strong> artworks from Harvard Art Museums and
              Metropolitan Museum of Art
            </li>
            <li>
              <span role="img" aria-label="star">
                ⭐
              </span>{" "}
              <strong>Curate</strong> your own personal collection by saving
              favourite artworks
            </li>
            <li>
              <span role="img" aria-label="image">
                🖼️
              </span>{" "}
              <strong>View</strong> images and details for each artwork
            </li>
            <li>
              <span role="img" aria-label="session">
                💾
              </span>{" "}
              <strong>Session Save</strong> – your selections are saved for your
              session
            </li>
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
