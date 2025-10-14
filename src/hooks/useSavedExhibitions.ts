import { useEffect, useState } from "react";
import { Exhibition } from "../types/index";

/**
 * Custom hook for managing saved exhibitions in localStorage.
 *
 * On mount, it loads saved exhibitions from localStorage.
 * It only writes to localStorage when the saved array is not empty,
 * which prevents overwriting localStorage with an empty array on initial render.
 *
 * Provides handleSave and handleUnsave to add/remove exhibitions.
 */

export function useSavedExhibitions() {
  const [saved, setSaved] = useState<Exhibition[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("savedExhibitions");

      if (savedData) setSaved(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (saved.length > 0) {
      localStorage.setItem("savedExhibitions", JSON.stringify(saved));
    }
  }, [saved]);

  const handleSave = (exhibition: Exhibition) => {
    setSaved((prev) =>
      prev.find((ex) => ex.id === exhibition.id) ? prev : [...prev, exhibition]
    );
  };
  const handleUnsave = (exhibition: Exhibition) => {
    setSaved((prev) => prev.filter((ex) => ex.id !== exhibition.id));
  };

  return { saved, handleSave, handleUnsave };
}
