export interface Exhibition {
  id: string;
  title: string;
  venue?: string;
  url?: string;
  source?: string;
  imageUrl: string | null;
  description?: string;
  begindate?: string;
  enddate?: string;
  artist?: string;
  medium?: string;
  dated?: string;
}

export interface ExhibitionFormProps {
  exhibition?: Exhibition;
  onSubmit: (data: Exhibition) => void;
}

export interface ExhibitionListProps {
  exhibitions: Exhibition[];
}
