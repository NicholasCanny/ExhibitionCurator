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
  const [sortBy, setSortBy] = useState<
    "title" | "venue" | "begindate" | "enddate" | "source"
  >("title");

  const filtered = exhibitions
    .filter((ex) => ex.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "begindate" || sortBy === "enddate") {
        return (a[sortBy] || "").localeCompare(b[sortBy] || "");
      }
      return (a[sortBy] || "").localeCompare(b[sortBy] || "");
    });

  return (
    <>
      <Navbar />
      <main>
        <h1 className="header">Exhibitions</h1>
        <p className="center-text">
          Browse exhibitions below. Click "Save" on any exhibition to add it to
          your personal collection. <br />
          You can view your saved exhibitions by clicking "Saved Exhibitions" in
          the navigation bar.
        </p>
        <form className="controls">
          <input
            type="text"
            placeholder="Search exhibitions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <option value="title">Title</option>
            <option value="venue">Venue</option>
            <option value="begindate">Start Date</option>
            <option value="enddate">End Date</option>
            <option value="source">Source</option>
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
