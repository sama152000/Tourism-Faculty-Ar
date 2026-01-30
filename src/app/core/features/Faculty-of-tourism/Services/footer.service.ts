import { Injectable } from '@angular/core';
import { FooterData } from '../model/footer.model';
import { ContactService } from './contact.service';
import { ServicesService } from './services.service';
import { Observable, map, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private contactService: ContactService, private servicesService: ServicesService) {}
getFooterData(): Observable<FooterData> {
  const contacts$ = this.contactService.getContacts();
  const services$ = this.servicesService.getServices();

  return forkJoin([contacts$, services$]).pipe(
    map(([contacts, services]) => {
      const contact = contacts.length > 0 ? contacts[0] : null;
      return {
        aboutText: 'تُكرس كلية السياحة والفنادق بجامعة الأقصر جهودها لتطوير التعليم والبحث العلمي والتنمية المهنية في قطاعي السياحة والضيافة.',
        copyrightText: '© 2025 كلية السياحة والفنادق - جامعة الأقصر. جميع الحقوق محفوظة.',
        contactInfo: {
          address: contact?.address || '',
          phone: contact?.phone || '',
          email: contact?.email || '',
          website: contact?.webSite || ''
        },
        socialLinks: [
          {
            id: '1',
            platform: 'Facebook',
            url: contact?.facebook || '#',
            icon: 'pi pi-facebook'
          },
          {
            id: '2',
            platform: 'Email',
            url: contact?.email ? `mailto:${contact.email}` : '#',
            icon: 'pi pi-envelope'
          },

        ],
        footerSections: [
         {
    title: 'روابط سريعة',
    links: [
      { id: '1', label: 'الرئيسية', routerLink: '/' },
      { id: '2', label: 'عن الكلية', routerLink: '/about' },
      { id: '4', label: 'الأخبار والفعاليات', routerLink: '/news-list' },
      { id: '5', label: 'اتصل بنا', routerLink: '/contact' }
    ]

  },

  {
    title: 'خدمات الطلاب',
    links: services.map((service, index) => ({
      id: (index + 1).toString(),
      label: service.title,
      routerLink: `/services/${service.slug}`
    }))
  }
        ]
      };
    })
  );
}
}