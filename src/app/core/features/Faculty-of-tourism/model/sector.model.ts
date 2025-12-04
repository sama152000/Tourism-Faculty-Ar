export interface Sector {
  id: string;
  name: string;
  title: string;
  overview: string;
  mission: string;
  objectives: string[];
  activities: string[];
  responsibilities: string[];
  facultyMembers: number;
  staff: number;
  icon: string;
}

export interface SectorTabsData {
  title: string;
  subtitle: string;
  sectors: Sector[];
}