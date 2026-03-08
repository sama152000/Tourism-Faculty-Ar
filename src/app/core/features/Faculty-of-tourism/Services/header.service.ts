import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { HeaderData, MenuItem, SocialLink } from '../model/header.model';
import { map } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { LogoService } from './logo.service';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(
    private http: HttpClient,
    private logoService: LogoService,
    private contactService: ContactService
  ) {}

  /** جلب بيانات الهيدر كاملة */
  getHeaderData(): Observable<HeaderData> {
    const menu$ = this.http.get<{ success: boolean; data: any[] }>(`${environment.apiUrl}menus/getall`);
    const logo$ = this.logoService.getLogo();
    const contacts$ = this.contactService.getContacts();

    return forkJoin([menu$, logo$, contacts$]).pipe(
      map(([menuResponse, logoUrl, contacts]) => {
        // تصفية العناصر الرئيسية فقط (التي ليس لها parentId)
        // مع الحفاظ على childs من الـ API
        const rootItems = menuResponse.data
          .filter(item => !item.parentId) // فقط العناصر الرئيسية
          .map(item => this.mapToMenuItem(item));

        // الحصول على بيانات الاتصال الأولى
        const contact = contacts.length > 0 ? contacts[0] : null;

        // بناء روابط التواصل الاجتماعي من بيانات الاتصال
        const socialLinks: SocialLink[] = [];
        
        if (contact?.facebook) {
          socialLinks.push({ id: '1', platform: 'Facebook', url: contact.facebook, icon: 'pi pi-facebook' });
        }
        if (contact?.email) {
          socialLinks.push({ id: '7', platform: 'Email', url: `mailto:${contact.email}`, icon: 'pi pi-envelope' });
        }

        return {
          logo: logoUrl,
          title: 'كلية السياحة والفنادق',
          searchPlaceholder: 'ابحث...',
          languageButton: 'English',
          socialLinks: socialLinks,
          navigationItems: rootItems
        } as HeaderData;
      })
    );
  }

  /** تحويل عنصر الـ API إلى MenuItem */
  private mapToMenuItem(apiItem: any, parentSlug: string = ''): MenuItem {
    // Determine the correct router link based on parent
    const routerLink = this.resolveRouterLink(apiItem, parentSlug);
    
    return {
      id: apiItem.id,
      label: apiItem.title,
      titleEn: apiItem.titleEn,
      slug: apiItem.slug,
      routerLink: routerLink,
      icon: apiItem.icon || '',
      order: apiItem.order,
      pageTemplate: apiItem.pageTemplate,
      // استخدام childs من الـ API مباشرة إذا كانت موجودة
      items: apiItem.childs?.length > 0 
        ? apiItem.childs.map((child: any) => this.mapToMenuItem(child, apiItem.slug))
        : []
    };
  }

  /** تحديد الرابط حسب نوع الصفحة */
  private resolveRouterLink(apiItem: any, parentSlug: string = ''): string {
    // صفحات خاصة داخل "عن الكلية"
    const aboutSubPages = ['vision', 'mission', 'goals', 'history', 'dean-word'];
    
    // إذا كان هناك parent، نستخدم parent slug + current slug
    if (parentSlug) {
      if (parentSlug === 'units') {
        return `/units/${apiItem.slug}`;
      } else if (parentSlug === 'departments') {
        return `/departments/${apiItem.slug}`;
      } else if (parentSlug === 'sectors') {
        return `/sectors/${apiItem.slug}`;
      } else if (parentSlug === 'services') {
        return `/services/${apiItem.slug}`;
      } else if (parentSlug === 'programs') {
        return `/programs/${apiItem.slug}`;
      } else if (parentSlug === 'centers') {
        return `/centers/${apiItem.slug}`;
      } else if (parentSlug === 'Administrative') {
        return `/units/${apiItem.slug}`;
      } else {
        return `/${parentSlug}/${apiItem.slug}`;
      }
    }
    
    if (apiItem.pageTemplate === 'Custome') {
      // إذا كان عنصر رئيسي (له children) ولا يحتاج لرابط صفحة
      if (apiItem.childs && apiItem.childs.length > 0) {
        // العنصر الأب لا يحتاج لرابط أو يمكن ربطه بصفحة فارغة
        return '';
      }
      return `/custom/${apiItem.slug}`;
    } else if (apiItem.slug === 'home') {
      return '/';
    } else if (aboutSubPages.includes(apiItem.slug)) {
      // صفحات فرعية من "عن الكلية"
      return `/about/${apiItem.slug}`;
    } else {
      return `/${apiItem.slug}`;
    }
  }
}

