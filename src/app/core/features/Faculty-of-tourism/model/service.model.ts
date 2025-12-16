export interface Service {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  isActive: boolean;
}

export interface ServicesTabsData {
  title: string;
  subtitle: string;
  sections: Service[];
}
