import ExhibitionCard from "./ExhibitionCard";
import { Exhibition } from "../types/index";

type ExhibitionListProps = {
  exhibitions: Exhibition[];
  onSave?: (exhibition: Exhibition) => void;
  onUnsave?: (exhibition: Exhibition) => void;
  savedIds?: string[];
};

export default function ExhibitionList({
  exhibitions,
  onSave,
  onUnsave,
  savedIds = [],
}: ExhibitionListProps) {
  if (!exhibitions.length) {
    return <p className="center-text">No exhibitions to display.</p>;
  }

  return (
    <div className="grid-container">
      {exhibitions.map((exhibition) => (
        <ExhibitionCard
          key={exhibition.id}
          exhibition={exhibition}
          onSave={() => onSave?.(exhibition)}
          onUnsave={() => onUnsave?.(exhibition)}
          isSaved={savedIds.includes(exhibition.id)}
        />
      ))}
    </div>
  );
}
