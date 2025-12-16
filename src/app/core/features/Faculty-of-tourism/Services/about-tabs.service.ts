import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AboutTabsData, AboutSection } from '../model/about-faculty.model';
import { map, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutTabsService {
  constructor(private http: HttpClient) {}

  // الميثود الأساسية اللي بتجيب كل الداتا
  getAboutTabsData(): Observable<AboutTabsData> {
    const about$ = this.http.get<any>(`${environment.apiUrl}about/getall`);
    const dean$ = this.http.get<any>(`${environment.apiUrl}deanspeechs/getall`);

    return forkJoin([about$, dean$]).pipe(
      map(([aboutResponse, deanResponse]) => {
        const aboutUniversity = aboutResponse.data.find((item: any) => item.pageType === 'AboutUniversity');

        const sections: AboutSection[] = [];

        if (aboutUniversity) {
          sections.push({
            id: 'vision-mission',
            title: 'الرؤية والرسالة',
            content: `${aboutUniversity.vision}\n\n${aboutUniversity.mission}`,
            additionalInfo: aboutUniversity.content,
          });

         sections.push({
  id: 'goals',
  title: 'أهداف الكلية',
  content: aboutUniversity.goals
    .filter((g: any) => g.goalName) // استبعد الـ null
    .map((g: any) => `• ${g.goalName}`)
    .join('\n')
});


          if (aboutUniversity.history) {
            sections.push({
              id: 'history',
              title: 'تاريخ الكلية',
              content: aboutUniversity.history
            });
          }
        }

        const deanSpeech = deanResponse.data[0];
        if (deanSpeech) {
          sections.push({
            id: 'dean-word',
            title: 'كلمة العميد',
            content: deanSpeech.speech,
            additionalInfo: `${deanSpeech.memberName} - ${deanSpeech.memberPosition}`,
            image: deanSpeech.deanSpeechAttachments?.[0]?.url
          });
        }

        return {
          title: 'عن كلية السياحة والفنادق',
          subtitle: 'تعرف أكثر على كليتنا من خلال الأقسام الشاملة التالية',
          sections,
          aboutInfo: {
            title: 'عن الكلية',
            overlayImage: aboutUniversity?.image || '' // assuming aboutUniversity has image
          }
        } as AboutTabsData;
      })
    );
  }

  // الميثود اللي محتاجها الـ Header
  getAboutSections(): Observable<AboutSection[]> {
    return this.getAboutTabsData().pipe(
      map(data => data.sections)
    );
  }
}
