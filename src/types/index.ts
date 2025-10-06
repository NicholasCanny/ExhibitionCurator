export interface Exhibition {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

export interface ExhibitionFormProps {
  exhibition?: Exhibition;
  onSubmit: (data: Exhibition) => void;
}

export interface ExhibitionListProps {
  exhibitions: Exhibition[];
}