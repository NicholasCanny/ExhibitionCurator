import React, { useState } from "react";

interface Exhibition {
  id: string;
  title: string;
  venue?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
  description?: string;
  begindate?: string;
  enddate?: string;
  artist?: string;
  medium?: string;
  dated?: string;
}

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onSave?: () => void;
  onUnsave?: () => void;
  isSaved?: boolean;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  exhibition,
  onSave,
  onUnsave,
  isSaved,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="exhibition-card">
      {/* Only image, venue, and title visible before modal */}
      <div
        className="article-card"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        <div className="image-container">
          <img
            src={exhibition.imageUrl || "/placeholder.jpg"}
            alt={`Image for ${exhibition.title}`}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
            }}
          />
        </div>
        <h3>{exhibition.title}</h3>
        {exhibition.venue && (
          <p>
            <strong>Venue:</strong> {exhibition.venue}
          </p>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isSaved) {
              onUnsave && onUnsave();
            } else {
              onSave && onSave();
            }
          }}
          className="button"
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>
      {/* Save/Unsave Button */}

      {/* Modal with all details */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{exhibition.title}</h2>
            <img
              src={exhibition.imageUrl || "/placeholder.jpg"}
              alt={`Full image for ${exhibition.title}`}
              className="modal-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />
            {exhibition.artist && (
              <p>
                <strong>Artist:</strong> {exhibition.artist}
              </p>
            )}
            {exhibition.medium && (
              <p>
                <strong>Medium:</strong> {exhibition.medium}
              </p>
            )}
            {exhibition.dated && (
              <p>
                <strong>Date:</strong> {exhibition.dated}
              </p>
            )}
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
            <p>{exhibition.description || "No description available."}</p>
            {exhibition.url && (
              <a
                href={exhibition.url}
                target="_blank"
                rel="noopener noreferrer"
                className="museum-link"
              >
                View on museum website
              </a>
            )}
            <button onClick={() => setShowModal(false)} className="button">
              Close
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isSaved) {
                  onUnsave && onUnsave();
                } else {
                  onSave && onSave();
                }
              }}
              className="button"
            >
              {isSaved ? "Unsave" : "Save"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExhibitionCard;
