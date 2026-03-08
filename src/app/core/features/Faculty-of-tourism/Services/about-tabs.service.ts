import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AboutTabsData, AboutSection } from '../model/about-faculty.model';
import { map, forkJoin, Observable } from 'rxjs'; // ✅ استدعاء الدالة

@Injectable({
  providedIn: 'root'
})
export class AboutTabsService {
  constructor(private http: HttpClient) {}

  getAboutTabsData(): Observable<AboutTabsData> {
    const about$ = this.http.get<any>(`${environment.apiUrl}about/getall`);
    const dean$ = this.http.get<any>(`${environment.apiUrl}deanspeechs/getall`);

    return forkJoin([about$, dean$]).pipe(
      map(([aboutResponse, deanResponse]) => {
        const aboutUniversity = aboutResponse.data.find((item: any) => item.pageType === 'AboutUniversity');

        const sections: AboutSection[] = [];

        if (aboutUniversity) {
          sections.push({
            id: 'vision',
            title: 'الرؤية',
            content: aboutUniversity.vision,
            slug: 'vision'
          });

          sections.push({
            id: 'mission',
            title: 'الرسالة',
            content: aboutUniversity.mission,
            slug: 'mission'
          });

          sections.push({
            id: 'goals',
            title: 'أهداف الكلية',
            content: aboutUniversity.goals
              .filter((g: any) => g.goalName)
              .map((g: any) => `• ${g.goalName}`)
              .join('\n'),
            slug: 'goals'
          });

          if (aboutUniversity.history) {
            sections.push({
              id: 'history',
              title: 'تاريخ الكلية',
              content: aboutUniversity.history,
              slug: 'history'
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
            image: deanSpeech.deanSpeechAttachments?.[0]?.url,
            slug: 'dean-word'
          });
        }

        return {
          title: 'عن كلية السياحة والفنادق',
          subtitle: 'تعرف أكثر على كليتنا من خلال الأقسام الشاملة التالية',
          sections,
          aboutInfo: {
            title: 'عن الكلية',
            overlayImage: aboutUniversity?.image || ''
          }
        } as AboutTabsData;
      })
    );
  }

  getAboutSections(): Observable<AboutSection[]> {
    return this.getAboutTabsData().pipe(
      map(data => data.sections)
    );
  }
}
