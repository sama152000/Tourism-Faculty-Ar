export interface Service {
  id: string;
  name: string;
  title: string;
  overview: string;
  mission: string;
  objectives: string[];
  offerings: string[];
  benefits: string[];
  staffMembers: number;
  users: number;
  icon: string;
}

export interface ServiceTabsData {
  title: string;
  subtitle: string;
  services: Service[];
}