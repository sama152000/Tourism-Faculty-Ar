export interface Unit {
  id: string;
  name: string;
  title: string;
  overview: string;
  mission: string;
  objectives: string[];
  functions: string[];
  services: string[];
  personnel: number;
  capacity: number;
  icon: string;
}

export interface UnitTabsData {
  title: string;
  subtitle: string;
  units: Unit[];
}