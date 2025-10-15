import { useState, useEffect } from "react";
import ExhibitionList from "../components/ExhibitionList";
import Navbar from "../components/Navbar";
import { useExhibitions } from "../hooks/useExhibitions";
import { useSavedExhibitions } from "../hooks/useSavedExhibitions";

function ExhibitionsPage() {
  useEffect(() => {
    document.title = "Exhibitions - Exhibition Curator";
  }, []);

  const { exhibitions, loading, error } = useExhibitions();
  const { saved, handleSave, handleUnsave } = useSavedExhibitions();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "venue" | "artist" | "dated">(
    "title"
  );

  const filtered = exhibitions
    .filter((ex) => ex.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      return (a[sortBy] || "").localeCompare(b[sortBy] || "");
    });

  return (
    <>
      <Navbar />
      <main aria-label="Exhibitions page main content">
        <h1 className="header">Artworks</h1>
        <p className="center-text">
          Browse artworks below. Click "Save" on any artwork to add it to your
          personal collection. <br />
          You can view your saved artworks by clicking "My Collection" in the
          navigation bar.
        </p>
        <form className="controls" aria-label="Search and sort controls">
          <input
            type="text"
            placeholder="Search artworks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search artworks by title"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort artworks by"
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="venue">Museum</option>
            <option value="dated">Date</option>
          </select>
        </form>
        {loading && <p className="center-text">Loading exhibitions...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <ExhibitionList
            exhibitions={filtered}
            onSave={handleSave}
            onUnsave={handleUnsave}
            savedIds={saved.map((ex) => ex.id)}
          />
        )}
      </main>
    </>
  );
}

export default ExhibitionsPage;
