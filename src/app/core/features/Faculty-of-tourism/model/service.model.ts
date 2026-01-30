export interface Service {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  isActive: boolean;
    slug?: string;

}

export interface ServicesTabsData {
  title: string;
  subtitle: string;
  sections: Service[];
}
