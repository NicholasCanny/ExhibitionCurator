import { useEffect, useState } from "react";
import ExhibitionList from "../components/ExhibitionList";
import Navbar from "../components/Navbar";

interface Exhibition {
  id: string;
  title: string;
  venue?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
  description?: string;
  begindate?: string;
  enddate?: string;
  artist?: string;
  medium?: string;
  dated?: string;
}

const SavedExhibitionsPage = () => {
  const [saved, setSaved] = useState<Exhibition[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("savedExhibitions");
    if (savedData) setSaved(JSON.parse(savedData));
  }, []);

  const handleUnsave = (exhibition: Exhibition) => {
    const updated = saved.filter((ex) => ex.id !== exhibition.id);
    setSaved(updated);
    localStorage.setItem("savedExhibitions", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <main>
        <h1 className="header">Saved Exhibitions</h1>
        <ExhibitionList
          exhibitions={saved}
          onUnsave={handleUnsave}
          savedIds={saved.map((ex) => ex.id)}
        />
      </main>
    </>
  );
};

export default SavedExhibitionsPage;
