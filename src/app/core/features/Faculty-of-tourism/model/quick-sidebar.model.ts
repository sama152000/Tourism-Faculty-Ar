export interface SidebarLink {
  id: string;
  title: string;
  icon: string;
  routerLink: string | string[];
  isExternal?: boolean;
}

export interface QuickSidebarData {
  title: string;
  links: SidebarLink[];
  position: 'left' | 'right';
}