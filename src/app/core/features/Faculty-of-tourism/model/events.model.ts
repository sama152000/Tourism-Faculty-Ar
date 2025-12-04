
export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  image: string;
  link?: string;
}
export interface EventsData {
  title: string;
  events: EventItem[];
  viewAllLink: string;
}