
export interface AboutInfo {
  title: string;
  description: string;
  highlights: string[];
  buttonText: string;
  buttonLink: string;
  mainImage: string;
  overlayImage: string;
}
export interface AboutFacultyData {
  aboutInfo: AboutInfo;
}

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  additionalInfo?: string;
  image?: string;
}

export interface AboutTabsData {
  title: string;
  subtitle: string;
  sections: AboutSection[];
}