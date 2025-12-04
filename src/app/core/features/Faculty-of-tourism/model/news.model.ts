export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: Date;
  link?: string;
}
export interface NewsData {
  title: string;
  news: NewsItem[];
  viewAllLink: string;
}