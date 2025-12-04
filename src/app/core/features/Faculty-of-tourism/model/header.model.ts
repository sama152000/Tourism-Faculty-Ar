export interface HeaderData {
  logo: string;
  title: string;
  navigationItems: MenuItem[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  languageButton: string;
}

export interface MenuItem {
  id: string;
  label: string;
  routerLink?: string;
  url?: string;
  icon?: string;
  queryParams?: {[k: string]: any};
  items?: MenuItem[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  routerLink?: string;
  items?: NavigationSubItem[];
  icon?: string;
}

export interface NavigationSubItem {
  id: string;
  label: string;
  routerLink: string;
  queryParams?: any;
}