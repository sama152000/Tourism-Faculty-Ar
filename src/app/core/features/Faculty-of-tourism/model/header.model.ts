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
  label: string;              // اسم العنصر (title)
  titleEn?: string;          // الاسم بالإنجليزية
  slug?: string;             // الـ slug من الـ backend
  routerLink?: string | string[];  // الرابط النهائي (دعم string أو array)
  url?: string;              // لو فيه رابط خارجي
  icon?: string;
  order?: number;
  queryParams?: { [k: string]: any };
  items?: MenuItem[];         // العناصر الفرعية (childs)
  pageTemplate?: 'Default' | 'Custome'; // نوع الصفحة
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
  slug: string;
  routerLink?: string;
  items?: NavigationSubItem[];
  icon?: string;
  pageTemplate?: 'Default' | 'Custome';
}

export interface NavigationSubItem {
  id: string;
  label: string;
  slug: string;
  routerLink: string;
  queryParams?: any;
  pageTemplate?: 'Default' | 'Custome';
}
