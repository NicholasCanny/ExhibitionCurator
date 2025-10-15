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
        let harvardArtworks: Exhibition[] = [];
        let metArtworks: Exhibition[] = [];
        let failedAPIs: string[] = [];

        // Harvard OBJECTS API (individual artworks)
        try {
          const harvardRes = await fetch(
            `https://api.harvardartmuseums.org/object?size=50&hasimage=1&apikey=a8a509db-aabd-42eb-8e9f-3c518d4155a0`
          );

          if (harvardRes.ok) {
            const harvardData = await harvardRes.json();

            harvardArtworks = (harvardData.records || [])
              .filter((artwork: any) => artwork.primaryimageurl)
              .slice(0, 25)
              .map((artwork: any) => ({
                id: `harvard-${artwork.id}`,
                title: artwork.title || "Untitled Artwork",
                venue: "Harvard Art Museums",
                url:
                  artwork.url ||
                  `https://harvardartmuseums.org/collections/object/${artwork.id}`,
                source: "Harvard",
                imageUrl: artwork.primaryimageurl || null,
                description:
                  artwork.description ||
                  artwork.labeltext ||
                  "No description available",
                artist: artwork.people?.[0]?.name || "Unknown Artist",
                medium: artwork.technique || artwork.medium || "Unknown Medium",
                dated: artwork.dated || artwork.datebegin || "Unknown Date",
                department: artwork.classification,
                dimensions: artwork.dimensions,
                culture: artwork.culture,
                period: artwork.period,
                begindate: undefined,
                enddate: undefined,
              }));
          } else {
            failedAPIs.push("Harvard Art Museums");
          }
        } catch (harvardError) {
          failedAPIs.push("Harvard Art Museums");
        }

        // Met API (individual artworks)
        try {
          const metRes = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting`
          );

          if (metRes.ok) {
            const metData = await metRes.json();

            const objectIds = (metData.objectIDs || []).slice(0, 25);

            const objectPromises = objectIds.map(async (id: any) => {
              try {
                const objRes = await fetch(
                  `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                );

                if (objRes.ok) {
                  const objData = await objRes.json();
                  const imageUrl =
                    objData.primaryImageSmall || objData.primaryImage;

                  if (
                    imageUrl &&
                    imageUrl.trim() !== "" &&
                    imageUrl.includes("metmuseum.org") &&
                    objData.title &&
                    objData.title.trim() !== ""
                  ) {
                    return {
                      id: `met-${objData.objectID}`,
                      title: objData.title || "Untitled",
                      venue: objData.repository || "The Met",
                      url: objData.objectURL,
                      source: "The Met",
                      imageUrl: imageUrl,
                      artist: objData.artistDisplayName || "Unknown Artist",
                      medium: objData.medium || "Unknown Medium",
                      dated: objData.objectDate || "Unknown Date",
                      description:
                        objData.creditLine || "No description available",
                      department: objData.department,
                      dimensions: objData.dimensions,
                      culture: objData.culture,
                      period: objData.period,
                      begindate: undefined,
                      enddate: undefined,
                    };
                  }
                }
                return null;
              } catch {
                return null;
              }
            });

            const results = await Promise.all(objectPromises);
            metArtworks = results.filter(Boolean).slice(0, 15);
          } else {
            failedAPIs.push("The Met");
          }
        } catch (metError) {
          failedAPIs.push("The Met");
        }

        setExhibitions([...harvardArtworks, ...metArtworks]);

        // Set appropriate error message based on which APIs failed
        if (harvardArtworks.length === 0 && metArtworks.length === 0) {
          setError(
            "Unable to fetch artworks from museum APIs. Please try again later."
          );
        } else if (failedAPIs.length > 0) {
          setError(
            `Note: Some artworks may be missing due to temporary issues with ${failedAPIs.join(
              " and "
            )} API.`
          );
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  return { exhibitions, loading, error };
}
