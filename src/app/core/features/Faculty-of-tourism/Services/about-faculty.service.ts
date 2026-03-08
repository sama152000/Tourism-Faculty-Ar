import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AboutFacultyData } from '../model/AboutFacultyData.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutFacultyService {
  constructor(private http: HttpClient) {}

  /** جلب بيانات عن الكلية من الـ API */
  getAboutFacultyData(): Observable<AboutFacultyData> {
    return this.http.get<any>(`${environment.apiUrl}about/getall`).pipe(
      map(response => {
        // جلب بيانات AboutUniversity
        const aboutUniversity = response.data.find((item: any) => item.pageType === 'AboutUniversity');
        
        if (aboutUniversity) {
          // استخراج الـ goals كـ highlights
          const highlights = aboutUniversity.goals
            ?.filter((g: any) => g.goalName)
            .map((g: any) => g.goalName) || [];

          return {
            aboutInfo: {
              title: aboutUniversity.title || 'عن الكلية',
              description: aboutUniversity.description || '',
              highlights: highlights,
              buttonText: 'تعرف أكثر على الكلية',
              buttonLink: '/about/goals',
              mainImage: aboutUniversity.image || './assets/slide2.jpg',
              overlayImage: aboutUniversity.image || './assets/about.jpg'
            }
          } as AboutFacultyData;
        }

        // في حال عدم وجود بيانات، نرجع البيانات الافتراضية
        return {
          aboutInfo: {
            title: 'عن الكلية',
            description: 'تُعد كلية السياحة والفنادق بجامعة الأقصر مؤسسة رائدة...',
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
        } as AboutFacultyData;
      })
    );
  }
}
