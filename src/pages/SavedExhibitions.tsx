import ExhibitionList from "../components/ExhibitionList";
import Navbar from "../components/Navbar";
import { useSavedExhibitions } from "../hooks/useSavedExhibitions";
import { useEffect } from "react";

export default function SavedExhibitionsPage() {
  useEffect(() => {
    document.title = "Saved Exhibitions - Exhibition Curator";
  }, []);

  const { saved, handleUnsave } = useSavedExhibitions();

  return (
    <>
      <Navbar />
      <main aria-label="Saved Exhibitions page main content">
        <h1 className="header">Saved Exhibitions</h1>
        {saved.length === 0 ? (
          <p className="center-text">
            No exhibitions to display.
            <br />
            <a href="/exhibitions" className="button">
              Start Exploring
            </a>
          </p>
        ) : (
          <ExhibitionList
            exhibitions={saved}
            onUnsave={handleUnsave}
            savedIds={saved.map((ex) => ex.id)}
          />
        )}
      </main>
    </>
  );
}
