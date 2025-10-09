import { useState } from "react";
import { Exhibition } from "../types/index";

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onSave?: () => void;
  onUnsave?: () => void;
  isSaved?: boolean;
}

export default function ExhibitionCard({
  exhibition,
  onSave,
  onUnsave,
  isSaved,
}: ExhibitionCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSaveUnsave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      onUnsave?.();
    } else {
      onSave?.();
    }
  };

  return (
    <section className="exhibition-card">
      <div
        className="article-card"
        style={{ cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        <div className="image-container">
          <img
            src={
              exhibition.imageUrl && exhibition.imageUrl.trim() !== ""
                ? exhibition.imageUrl
                : "/placeholder.jpg"
            }
            alt={`Image for ${exhibition.title}`}
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
        <button onClick={handleSaveUnsave} className="button">
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{exhibition.title}</h2>
            <img
              src={exhibition.imageUrl ?? "/placeholder.jpg"}
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
            <p>{exhibition.description ?? "No description available."}</p>
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
            <button onClick={handleSaveUnsave} className="button">
              {isSaved ? "Unsave" : "Save"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// When mapping Harvard exhibition/object data:
// imageUrl: record.images && record.images.length > 0
//   ? record.images[0].baseimageurl + "?height=150&width=150"
//   : null
