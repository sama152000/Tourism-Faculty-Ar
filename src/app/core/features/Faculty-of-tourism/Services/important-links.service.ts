import { Injectable } from '@angular/core';
import { ImportantLinksData } from '../model/important-links.model';

@Injectable({
  providedIn: 'root'
})
export class ImportantLinksService {

  getImportantLinksData(): ImportantLinksData {
    return {
      title: 'روابط وخدمات هامة',
      links: [
        {
          id: '1',
          title: 'بوابة الجامعة الإلكترونية',
          image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300',
          url: 'https://www.luxor.edu.eg'
        },
        {
          id: '2',
          title: 'منصة التعلم الإلكتروني',
          image: 'https://images.pexels.com/photos/4144135/pexels-photo-4144135.jpeg?auto=compress&cs=tinysrgb&w=300',
          url: '/elearning'
        },
        {
          id: '3',
          title: 'المكتبة الرقمية',
          image: 'https://images.pexels.com/photos/159832/magazine-reading-relax-news-159832.jpeg?auto=compress&cs=tinysrgb&w=300',
          url: '/library'
        },
        {
          id: '4',
          title: 'شئون الطلاب',
          image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
          url: '/student-affairs'
        },
        {
          id: '5',
          title: 'مركز البحوث',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          url: '/research'
        },
        {
          id: '6',
          title: 'خدمات التوظيف والتدريب',
          image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
          url: '/careers'
        }
      ]
    };
  }
}