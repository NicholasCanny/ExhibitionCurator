import React from "react";
import ExhibitionCard from "./ExhibitionCard";

interface Exhibition {
  id: string;
  title: string;
  venue?: string;
  url?: string;
  source?: string;
  imageUrl?: string;
}

interface ExhibitionListProps {
  exhibitions: Exhibition[];
}

const ExhibitionList: React.FC<ExhibitionListProps> = ({ exhibitions }) => {
  return (
    <div className="grid-container">
      {exhibitions.map((exhibition) => (
        <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
      ))}
    </div>
  );
};

export default ExhibitionList;
