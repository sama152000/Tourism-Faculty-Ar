import { Injectable } from '@angular/core';
import { NewsData } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  getNewsData(): NewsData {
    return {
      title: 'آخر أخبار الكلية',
      viewAllLink: '/news',
      news: [
        {
          id: '1',
          title: 'ندوة علمية بالكلية حول تنمية السياحة المستدامة',
          excerpt: 'نظمت الكلية ندوة شاملة ركزت على ممارسات السياحة البيئية والتنمية المستدامة للمستقبل.',
          image: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=400',
          date: new Date('2025-01-15'),
          link: '/news/sustainable-tourism-seminar'
        },
        {
          id: '2',
          title: 'ورشة عمل للطلاب في إدارة عمليات الفنادق',
          excerpt: 'شارك الطلاب في ورشة عمل مكثفة لاكتساب خبرات عملية في أفضل ممارسات إدارة الفنادق والضيافة.',
          image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=400',
          date: new Date('2025-01-10'),
          link: '/news/hotel-operations-workshop'
        },
        {
          id: '3',
          title: 'احتفالية أسبوع التراث الثقافي السنوي',
          excerpt: 'شهدت الاحتفالية السنوية عروضًا متنوعة ومعارض تحتفي بالتراث الثقافي المصري الغني وأهميته السياحية.',
          image: 'https://images.pexels.com/photos/2177009/pexels-photo-2177009.jpeg?auto=compress&cs=tinysrgb&w=400',
          date: new Date('2025-01-05'),
          link: '/news/cultural-heritage-week'
        }
      ]
    };
  }
}