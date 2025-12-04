import { Injectable } from '@angular/core';
import { MagazineData } from '../model/magazine.model';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  getMagazineData(): MagazineData {
    return {
      magazineInfo: {
        title: 'مجلة الكلية البحثية',
        description: 'المجلة الدولية لإدارة السياحة والضيافة (IJTHM) هي الإصدار العلمي الرئيسي لكليتنا، وتضم أحدث الأبحاث في مجالي السياحة والضيافة. يتناول العدد الأخير موضوع الضغط الوظيفي وتأثيره على أداء الموظفين في فنادق الثلاث نجوم، مع دراسة العوامل النفسية والفسيولوجية التي تسهم في نجاح المنشآت الفندقية.',
        buttonText: 'اقرأ أحدث عدد',
        buttonLink: 'https://ijthm.journals.ekb.eg/',
        coverImage: '/assets/mag.jpg'
      }
    };
  }
}