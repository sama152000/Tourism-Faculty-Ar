import { Injectable } from '@angular/core';
import { DepartmentsData } from '../model/departments.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  getDepartmentsData(): DepartmentsData {
    return {
      title: 'أقسامنا العلمية',
      subtitle: 'تعرف على الأقسام العلمية الرئيسية بكلية السياحة والفنادق',
      departments: [
        {
          id: '1',
          name: 'الدراسات السياحية',
          description: 'يركز على تخطيط السياحة، إدارة التراث، الإرشاد السياحي، واستراتيجيات تنمية الوجهات.',
          image: './assets/tour4.jpg',
          link: '/departments/tourism'
        },
        {
          id: '2',
          name: 'إدارة الفنادق',
          description: 'يتخصص في عمليات الفنادق، إدارة الأغذية والمشروبات، جودة الخدمة، وتحسين الإيرادات.',
          image: './assets/tour12.jpeg',
          link: '/departments/hotel'
        },
        {
          id: '3',
          name: 'الإرشاد والتفسير السياحي',
          description: 'تدريب مرشدين سياحيين محترفين وخدمات تفسير للمواقع التراثية والسياحة الثقافية.',
          image: './assets/event3.jpg',
          link: '/departments/guidance'
        },
        {
          id: '4',
          name: 'السياحة المستدامة',
          description: 'يركز على ممارسات السياحة الصديقة للبيئة، الحفاظ على البيئة، والسياحة المجتمعية.',
          image: './assets/event3.jpg',
          link: '/departments/sustainable'
        }
      ]
    };
  }
}