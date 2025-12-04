export interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: Date;
  category: 'news' | 'articles' | 'announcements' | 'events';
  link?: string;
}

export interface ContentData {
  title: string;
  items: ContentItem[];
  viewAllLink: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  mapUrl: string;
}