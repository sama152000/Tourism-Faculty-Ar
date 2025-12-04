import { Injectable } from '@angular/core';
import { AboutFacultyData } from '../model/about-faculty.model';

@Injectable({
  providedIn: 'root'
})
export class AboutFacultyService {

  getAboutFacultyData(): AboutFacultyData {
    return {
      aboutInfo: {
        title: 'عن الكلية',
        description: 'تُعد كلية السياحة والفنادق بجامعة الأقصر مؤسسة رائدة تُكرس جهودها لتحقيق التميز في مجالات الضيافة والسياحة والدراسات الثقافية. نهدف إلى تزويد الطلاب بأسس أكاديمية قوية وتدريب عملي متميز يؤهلهم ليصبحوا قادة المستقبل في صناعة السياحة العالمية.',
        highlights: [
          'برامج دراسية تجمع بين التعلم النظري والتطبيق العملي',
          'إشراف أكاديمي ومهني من نخبة الخبراء في المجال',
          'تركيز خاص على التراث الثقافي المصري والسياحة المستدامة',
          'شراكات قوية مع كبرى المؤسسات والفنادق السياحية'
        ],
        buttonText: 'تعرف أكثر على الكلية',
        buttonLink: '/about',
        mainImage: './assets/slide2.jpg',
        overlayImage: './assets/about.jpg'
      }
    };
  }
}