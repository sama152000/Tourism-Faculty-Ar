
export interface StatItem {
  id: string;
  value: number;
  label: string;
  icon?: string;
}

export interface StatisticsData {
  title: string;
  statistics: StatItem[];
  backgroundImage: string;
}