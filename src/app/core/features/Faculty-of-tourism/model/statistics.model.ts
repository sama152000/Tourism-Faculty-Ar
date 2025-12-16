export interface Statistic {
  id: string;
  title: string;
  value: string;
  iconPath: string;
  isActive: boolean;
}

export interface StatisticsData {
  title: string;
  subtitle: string;
  items: Statistic[];
}
