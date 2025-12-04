export interface SidebarLink {
  id: string;
  title: string;
  icon: string;
  url: string;
  isExternal?: boolean;
}

export interface QuickSidebarData {
  title: string;
  links: SidebarLink[];
  position: 'left' | 'right';
}