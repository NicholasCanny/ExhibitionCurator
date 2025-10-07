import React, { FC } from "react";
import ExhibitionList from "../components/ExhibitionList";
import Navbar from "../components/Navbar";
import { useSavedExhibitions } from "../hooks/useSavedExhibitions";

const SavedExhibitionsPage: FC = () => {
  const { saved, handleUnsave } = useSavedExhibitions();

  console.log("Saved exhibitions:", saved);
  return (
    <>
      <Navbar />
      <main>
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
};

export default SavedExhibitionsPage;
