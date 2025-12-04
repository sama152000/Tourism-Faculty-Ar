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
          title: 'عن الكلية',
          icon: 'pi pi-info-circle',
          url: '/about'
        },
       
        {
          id: '4',
          title: ' الاخبار',
          icon: 'pi pi-file-edit',
          url: '/news-list'
        },
        {
          id: '2',
          title: ' القطاعات',
          icon: 'pi pi-desktop',
          url: '/sectors'
        },
        {
          id: '3',
          title: 'الوحدات',
          icon: 'pi pi-book',
          url: '/units'
        },
        {
          id: '6',
          title: ' الاقسام',
          icon: 'pi pi-user',
          url: '/departments'
        },
        {
          id: '5',
          title: 'اتصل بنا',
          icon: 'pi pi-phone',
          url: '/contact'
        },
       
      ]
    };
  }
}