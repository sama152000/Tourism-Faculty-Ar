import { Injectable } from '@angular/core';
import { HeroSliderData } from '../model/hero-slider.model';

@Injectable({
  providedIn: 'root'
})
export class HeroSliderService {

  getHeroSliderData(): HeroSliderData {
    return {
      autoPlay: true,
      interval: 3000,
      slides: [
        {
          id: '1',
          image: './assets/slide3.jpg',
          title: 'أهلاً بكم في كلية السياحة والفنادق',
          description: 'اكتشف التميز في تعليم الضيافة والثقافة والسياحة بجامعة الأقصر.',
          buttonText: 'اعرف المزيد',
          buttonLink: '/about'
        },
        {
          id: '2',
          image: './assets/slide1.jpg',
          title: 'تعلم من خبراء الصناعة',
          description: 'برامجنا تؤهلك لمهن عالمية في إدارة السياحة والفنادق.',
          buttonText: 'استكشف البرامج',
          buttonLink: '/departments'
        },
        {
          id: '3',
          image: './assets/slide2.jpg',
          title: 'اكتشف التراث الثقافي المصري',
          description: 'ادرس في إحدى أغنى الوجهات السياحية التاريخية في العالم.',
          buttonText: 'اكتشف المزيد',
          buttonLink: '/about/heritage'
        }
      ]
    };
  }
}