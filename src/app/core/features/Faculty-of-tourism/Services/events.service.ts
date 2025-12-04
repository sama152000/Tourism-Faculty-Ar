import { Injectable } from '@angular/core';
import { EventsData } from '../model/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  getEventsData(): EventsData {
    return {
      title: 'الفعاليات القادمة للكلية',
      viewAllLink: '/news-list?category=events',
      events: [
        {
          id: '1',
          title: 'مؤتمر السياحة والضيافة 2025',
          description: 'انضموا إلى خبراء الصناعة وأعضاء هيئة التدريس لمناقشة اتجاهات المستقبل في تعليم السياحة والممارسة المهنية.',
          date: new Date('2025-03-15'),
          image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=500',
          link: '/events/tourism-conference-2025'
        },
        {
          id: '2',
          title: 'ورشة عمل حفظ التراث الثقافي',
          description: 'يقدم الطلاب مشاريع مبتكرة لحفظ الهوية الثقافية المصرية وتعزيز سياحة التراث المستدامة.',
          date: new Date('2025-02-28'),
          image: 'https://images.pexels.com/photos/2177009/pexels-photo-2177009.jpeg?auto=compress&cs=tinysrgb&w=500',
          link: '/events/heritage-workshop'
        },
        {
          id: '3',
          title: 'معرض التوظيف: لقاء قادة الصناعة',
          description: 'تواصلوا مع أبرز سلاسل الفنادق والوكالات السياحية التي تقدم فرص تدريب ووظائف لخريجينا.',
          date: new Date('2025-04-20'),
          image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=500',
          link: '/events/career-fair'
        },
        {
          id: '4',
          title: 'سلسلة محاضرات ضيوف دوليين في السياحة المستدامة',
          description: 'محاضرون دوليون يشاركون رؤاهم حول السياحة الصديقة للبيئة وممارسات الإدارة المستدامة.',
          date: new Date('2025-05-10'),
          image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=500',
          link: '/events/sustainable-tourism-lecture'
        }
      ]
    };
  }
}