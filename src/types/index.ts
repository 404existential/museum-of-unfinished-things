export type Category = 
  | 'Writing'
  | 'Software'
  | 'Business'
  | 'Music'
  | 'Art'
  | 'Film'
  | 'Personal'
  | 'Research'
  | 'Invention';

export type Status = 'Unattended' | 'Shelved' | 'Unresolved' | 'Published' | 'Withdrawn';

export interface Artifact {
  id: string; // e.g. A—9835263 or A—001842
  title: string;
  category: Category;
  year: string;
  status: Status;
  visualColor: 'pink' | 'acid' | 'cyan' | 'orange' | 'purple' | 'paper';
  description: string;
  text: string;
  note: string; // Why it stopped / marginalia
  username: string;
  tributes: number;
  rotation?: string; // e.g. 'rotate(-1.4deg)'
  shadowColor?: 'pink' | 'acid' | 'cyan' | 'orange' | 'purple';
}

export type SortOption = 'accession-desc' | 'year-asc' | 'year-desc' | 'tributes-desc';
