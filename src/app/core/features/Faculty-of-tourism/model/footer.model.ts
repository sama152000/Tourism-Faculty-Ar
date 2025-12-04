import { MenuItem } from "./header.model";

export interface FooterData {
  aboutText: string;
  footerSections: FooterSection[];
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  copyrightText: string;
}


export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}


export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export interface FooterSection {
  title: string;
  links: MenuItem[];
}