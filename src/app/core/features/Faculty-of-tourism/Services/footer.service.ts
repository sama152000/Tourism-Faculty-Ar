import { Injectable } from '@angular/core';
import { FooterData } from '../model/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  getFooterData(): FooterData {
    return {
      aboutText: 'تُكرس كلية السياحة والفنادق بجامعة الأقصر جهودها لتطوير التعليم والبحث العلمي والتنمية المهنية في قطاعي السياحة والضيافة.',
      copyrightText: '© 2025 كلية السياحة والفنادق - جامعة الأقصر. جميع الحقوق محفوظة.',
      contactInfo: {
        address: 'حرم جامعة الأقصر - مدينة الأقصر - مصر',
        phone: '+20 95 123 456 789',
        email: 'info@faculty-tourism.luxor.edu.eg',
        website: 'https://faculty-tourism.luxor.edu.eg'
      },
      socialLinks: [
        {
          id: '1',
          platform: 'Facebook',
          url: 'https://facebook.com/luxor-tourism-faculty',
          icon: 'pi pi-facebook'
        },
        {
          id: '2',
          platform: 'Twitter',
          url: 'https://twitter.com/luxor_tourism',
          icon: 'pi pi-twitter'
        },
        {
          id: '3',
          platform: 'Instagram',
          url: 'https://instagram.com/luxor_tourism_faculty',
          icon: 'pi pi-instagram'
        },
        {
          id: '4',
          platform: 'LinkedIn',
          url: 'https://linkedin.com/school/luxor-tourism-faculty',
          icon: 'pi pi-linkedin'
        },
        {
          id: '5',
          platform: 'YouTube',
          url: 'https://youtube.com/@luxortourismfaculty',
          icon: 'pi pi-youtube'
        }
      ],
      footerSections: [
       {
  title: 'روابط سريعة',
  links: [
    { id: '1', label: 'الرئيسية', routerLink: '/' },
    { id: '2', label: 'عن الكلية', routerLink: '/about' },
    { id: '3', label: 'الأقسام العلمية', routerLink: '/departments' },
    { id: '4', label: 'الأخبار والفعاليات', routerLink: '/news-list' },
    { id: '5', label: 'اتصل بنا', routerLink: '/contact' }
  ]
},

{
  title: 'خدمات الطلاب',
  links: [
    { id: '1', label: 'الدعم الأكاديمي', routerLink: '/services/1' },
    { id: '2', label: 'المكتبة ومصادر المعلومات', routerLink: '/services/2' },
    { id: '3', label: 'خدمات التوظيف والتدريب', routerLink: '/services/3' },
    { id: '4', label: 'البرامج الدولية', routerLink: '/services/4' }
  ]
}
      ]
    };
  }
}