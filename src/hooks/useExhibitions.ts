import { useEffect, useState } from "react";
import { Exhibition } from "../types/index";

export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            let imageUrl, artist, medium, dated;
            try {
              const artRes = await fetch(
                `https://api.harvardartmuseums.org/object?exhibition=${ex.id}&size=1&apikey=a8a509db-aabd-42eb-8e9f-3c518d4155a0`
              );
              if (artRes.ok) {
                const artData = await artRes.json();
                if (artData.records && artData.records[0]) {
                  const art = artData.records[0];
                  imageUrl = art.primaryimageurl;
                  artist =
                    art.people && art.people[0]
                      ? art.people[0].name
                      : undefined;
                  medium = art.medium;
                  dated = art.dated;
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
              imageUrl,
              description: ex.description,
              begindate: ex.begindate,
              enddate: ex.enddate,
              artist,
              medium,
              dated,
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
              imageUrl: objData.primaryImageSmall || objData.primaryImage,
              artist: objData.artistDisplayName,
              medium: objData.medium,
              dated: objData.objectDate,
              description: objData.creditLine,
              begindate: undefined,
              enddate: undefined,
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

  return { exhibitions, loading, error };
}
