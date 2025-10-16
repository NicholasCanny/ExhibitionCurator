import { useEffect, useState, useRef } from "react";
import { Exhibition } from "../types/index";

export function useExhibitions() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchExhibitions = async () => {
      setLoading(true);
      setError(null);

      try {
        let harvardArtworks: Exhibition[] = [];
        let metArtworks: Exhibition[] = [];
        let failedAPIs: string[] = [];

        // Harvard API - multiple categories
        try {
          const fetchHarvardCategory = async (
            classification: string,
            size: number = 15
          ) => {
            const res = await fetch(
              `https://api.harvardartmuseums.org/object?classification=${classification}&hasimage=1&size=25&apikey=a8a509db-aabd-42eb-8e9f-3c518d4155a0`
            );

            if (res.ok) {
              const data = await res.json();
              return (data.records || [])
                .filter((artwork: any) => artwork.primaryimageurl)
                .slice(0, size);
            }
            return [];
          };

          // Fetch multiple categories with small delays
          const paintings = await fetchHarvardCategory("Paintings", 20);
          await new Promise((resolve) => setTimeout(resolve, 200));

          const sculptures = await fetchHarvardCategory("Sculpture", 8);
          await new Promise((resolve) => setTimeout(resolve, 200));

          const drawings = await fetchHarvardCategory("Drawings", 7);

          const allHarvardRecords = [...paintings, ...sculptures, ...drawings];

          harvardArtworks = allHarvardRecords.map(
            (artwork: any): Exhibition => ({
              id: `harvard-${artwork.id}`,
              title: artwork.title || "Untitled Artwork",
              venue: artwork.venue || "Harvard Art Museums",
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
            })
          );
        } catch (harvardError) {
          failedAPIs.push("Harvard Art Museums");
        }

        // Met API - try multiple search strategies
        try {
          const knownMetObjects = [
            436532, 459055, 437853, 436105, 437312, 438815, 459080, 437329,
            436535, 437881, 11146, 435809, 436947, 437133, 437394, 438012,
            438458, 466165, 547802, 436084, 436124, 436531,
          ];

          let objectIds: number[] = [];

          // Try different search terms until one works
          const searchTerms = [
            "painting",
            "sculpture",
            "european",
            "american",
            "art",
          ];

          for (const term of searchTerms) {
            try {
              const searchRes = await fetch(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${term}`
              );

              if (searchRes.ok) {
                const searchData = await searchRes.json();
                if (
                  Array.isArray(searchData.objectIDs) &&
                  searchData.objectIDs.length > 0
                ) {
                  objectIds = searchData.objectIDs.slice(0, 20);

                  break; // Found good results, stop searching
                }
              }
            } catch (searchError) {
              continue; // Try next search term
            }
          }

          // If no search worked, use hardcoded IDs
          if (objectIds.length === 0) {
            objectIds = knownMetObjects;
          }

          const objectPromises = objectIds.map(
            async (id: number): Promise<Exhibition | null> => {
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
                    objData.title &&
                    objData.title.trim() !== ""
                  ) {
                    return {
                      id: `met-${objData.objectID}`,
                      title: objData.title || "Untitled",
                      venue: objData.repository || "The Met",
                      url: objData.objectURL || undefined,
                      source: "The Met",
                      imageUrl: imageUrl || null,
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
                    } as Exhibition;
                  }
                }
                return null;
              } catch (err) {
                return null;
              }
            }
          );

          const results = await Promise.all(objectPromises);
          metArtworks = results
            .filter((item): item is Exhibition => item !== null)
            .slice(0, 15);
        } catch (metError) {
          failedAPIs.push("The Met");
        }

        setExhibitions([...harvardArtworks, ...metArtworks]);

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
