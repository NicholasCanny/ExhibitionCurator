import { useEffect, useState } from "react";
import ExhibitionList from "../components/ExhibitionList";
import Navbar from "../components/Navbar";

function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search + Sort state
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "venue">("title");

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Harvard API
        const harvardRes = await fetch(
          `https://api.harvardartmuseums.org/exhibition?apikey=a8a509db-aabd-42eb-8e9f-3c518d4155a0`
        );
        if (!harvardRes.ok)
          throw new Error("Failed to fetch Harvard exhibitions");
        const harvardData = await harvardRes.json();
        const harvardExhibitions = await Promise.all(
          (harvardData.records || []).map(async (ex: any) => {
            // Try to fetch the first artwork for this exhibition
            let imageUrl;
            try {
              const artRes = await fetch(
                `https://api.harvardartmuseums.org/object?exhibition=${ex.id}&size=1&apikey=a8a509db-aabd-42eb-8e9f-3c518d4155a0`
              );
              if (artRes.ok) {
                const artData = await artRes.json();
                if (
                  artData.records &&
                  artData.records[0] &&
                  artData.records[0].primaryimageurl
                ) {
                  imageUrl = artData.records[0].primaryimageurl;
                }
              }
            } catch {
              imageUrl = undefined;
            }
            return {
              id: `harvard-${ex.id}`,
              title: ex.title || "Untitled Exhibition",
              venue: ex.venue || "Harvard Art Museums",
              url: ex.url || "https://harvardartmuseums.org/visit/exhibitions",
              source: "Harvard",
              imageUrl, // <-- add imageUrl here
            };
          })
        );

        // The Met API
        const metRes = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=exhibition`
        );
        if (!metRes.ok) throw new Error("Failed to fetch Met exhibitions");
        const metData = await metRes.json();
        const metExhibitions = await Promise.all(
          (metData.objectIDs || []).slice(0, 5).map(async (id: number) => {
            const objRes = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            const objData = await objRes.json();
            return {
              id: `met-${objData.objectID}`,
              title: objData.title || "Untitled",
              venue: objData.repository || "The Met",
              url: objData.objectURL,
              source: "The Met",
              imageUrl: objData.primaryImageSmall || objData.primaryImage, // <-- add imageUrl here
            };
          })
        );

        setExhibitions([...harvardExhibitions, ...metExhibitions]);
      } catch (err: any) {
        setError(err.message || "Failed to fetch exhibitions");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // ✅ Filter + Sort exhibitions
  const filtered = exhibitions
    .filter((ex) => ex.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[sortBy] || "").localeCompare(b[sortBy] || ""));

  return (
    <>
      <Navbar />
      <main>
        <header>Exhibitions</header>

        {/* Search + Sort Controls */}
        <form className="controls">
          <input
            type="text"
            placeholder="Search exhibitions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "title" | "venue")}
          >
            <option value="title">Title</option>
            <option value="venue">Venue</option>
          </select>
        </form>

        {loading && <p className="center-text">Loading exhibitions...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && <ExhibitionList exhibitions={filtered} />}
      </main>
    </>
  );
}

export default ExhibitionsPage;
