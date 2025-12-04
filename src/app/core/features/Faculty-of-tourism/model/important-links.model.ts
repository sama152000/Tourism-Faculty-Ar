export interface QuickLink {
  id: string;
  title: string;
  image: string;
  url: string;
}

export interface ImportantLinksData {
  title: string;
  links: QuickLink[];
}