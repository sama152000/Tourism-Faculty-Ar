import { Injectable } from '@angular/core';
import { QuickSidebarData } from '../model/quick-sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class QuickSidebarService {

  getQuickSidebarData(): QuickSidebarData {
    return {
      title: 'وصول سريع',
      position: 'right',
      links: [
        {
          id: '1',
          title: 'بوابة الطالب',
          icon: 'pi pi-user',
          url: '/student-portal'
        },
        {
          id: '2',
          title: 'التعلم الإلكتروني',
          icon: 'pi pi-desktop',
          url: '/elearning'
        },
        {
          id: '3',
          title: 'المكتبة',
          icon: 'pi pi-book',
          url: '/library'
        },
        {
          id: '4',
          title: 'القبول والتسجيل',
          icon: 'pi pi-file-edit',
          url: '/admissions'
        },
        {
          id: '5',
          title: 'اتصل بنا',
          icon: 'pi pi-phone',
          url: '/contact'
        },
        {
          id: '6',
          title: 'عن الكلية',
          icon: 'pi pi-info-circle',
          url: '/about'
        }
      ]
    };
  }
}