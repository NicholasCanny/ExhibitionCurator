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
        aria-label={`Open details for ${exhibition.title}`}
      >
        <div className="image-container" aria-label="Exhibition image">
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
            <strong>Museum:</strong> {exhibition.venue}
          </p>
        )}
        <button
          onClick={handleSaveUnsave}
          className="button"
          aria-label={`${isSaved ? "Remove" : "Add"} ${exhibition.title} ${
            isSaved ? "from" : "to"
          } saved exhibitions`}
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          aria-label="Modal overlay"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            aria-label="Modal content"
          >
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
                <strong>Museum:</strong> {exhibition.venue}
              </p>
            )}

            {exhibition.department && (
              <p>
                <strong>Department:</strong> {exhibition.department}
              </p>
            )}
            {exhibition.dimensions && (
              <p>
                <strong>Dimensions:</strong> {exhibition.dimensions}
              </p>
            )}
            {exhibition.culture && (
              <p>
                <strong>Culture:</strong> {exhibition.culture}
              </p>
            )}
            {exhibition.period && (
              <p>
                <strong>Period:</strong> {exhibition.period}
              </p>
            )}
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
            <button
              onClick={() => setShowModal(false)}
              className="button"
              aria-label={`Close details modal for ${exhibition.title}`}
            >
              Close
            </button>
            <button
              onClick={handleSaveUnsave}
              className="button"
              aria-label={`${isSaved ? "Remove" : "Add"} ${exhibition.title} ${
                isSaved ? "from" : "to"
              } saved exhibitions`}
            >
              {isSaved ? "Unsave" : "Save"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
