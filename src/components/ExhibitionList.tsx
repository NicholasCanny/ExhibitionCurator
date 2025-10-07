import React from "react";
import ExhibitionCard from "./ExhibitionCard";

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

interface ExhibitionListProps {
  exhibitions: Exhibition[];
  onSave?: (exhibition: Exhibition) => void;
  onUnsave?: (exhibition: Exhibition) => void;
  savedIds?: string[];
}

const ExhibitionList: React.FC<ExhibitionListProps> = ({
  exhibitions,
  onSave,
  onUnsave,
  savedIds = [],
}) => {
  return (
    <div className="grid-container">
      {exhibitions.map((exhibition) => (
        <ExhibitionCard
          key={exhibition.id}
          exhibition={exhibition}
          onSave={() => onSave && onSave(exhibition)}
          onUnsave={() => onUnsave && onUnsave(exhibition)}
          isSaved={savedIds.includes(exhibition.id)}
        />
      ))}
    </div>
  );
};

export default ExhibitionList;
