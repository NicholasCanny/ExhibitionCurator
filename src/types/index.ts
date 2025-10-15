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
  department?: string;
  dimensions?: string;
  culture?: string;
  period?: string;
}

export interface HarvardArtwork {
  id: string;
  title?: string;
  url?: string;
  primaryimageurl?: string;
  description?: string;
  labeltext?: string;
  people?: Array<{ name: string }>;
  technique?: string;
  medium?: string;
  dated?: string;
  datebegin?: string;
  classification?: string;
  dimensions?: string;
  culture?: string;
  period?: string;
}

export interface MetObject {
  objectID: number;
  title?: string;
  repository?: string;
  objectURL?: string;
  primaryImageSmall?: string;
  primaryImage?: string;
  artistDisplayName?: string;
  medium?: string;
  objectDate?: string;
  creditLine?: string;
  department?: string;
  dimensions?: string;
  culture?: string;
  period?: string;
}
