import React from "react";

interface Exhibition {
  id: string;
  title: string;
  venue?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
}

interface ExhibitionCardProps {
  exhibition: Exhibition;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ exhibition }) => (
  <a
    href={exhibition.url}
    target="_blank"
    rel="noopener noreferrer"
    className="article-card-link"
    style={{ textDecoration: "none", color: "inherit" }}
  >
    <section className="article-card">
      <h3>{exhibition.title}</h3>
      {exhibition.venue && (
        <p>
          <strong>Venue:</strong> {exhibition.venue}
        </p>
      )}
      {exhibition.source && (
        <p>
          <strong>Source:</strong> {exhibition.source}
        </p>
      )}
      <div className="image-container">
        <img
          src={exhibition.imageUrl || "/placeholder.jpg"}
          alt={`Image for ${exhibition.title}`}
          className="article-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
          }}
        />
      </div>
    </section>
  </a>
);

export default ExhibitionCard;
