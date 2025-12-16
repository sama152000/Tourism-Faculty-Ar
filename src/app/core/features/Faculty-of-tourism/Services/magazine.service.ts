import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Journal, MagazineData } from '../model/magazine.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {
  constructor(private http: HttpClient) {}

  getMagazineData(): Observable<MagazineData> {
    return this.http.get<any>(`${environment.apiUrl}journals/getall`).pipe(
      map(res => {
        const journals: Journal[] = res.data.map((j: any) => ({
          id: j.id,
          pubishedDate: j.pubishedDate,
          title: j.title,
          description: j.description,
          journalAttachments: j.journalAttachments || []
        }));

        return {
          title: 'مجلة الكلية',
          subtitle: 'تعرف على أحدث الإصدارات العلمية لكلية السياحة والفنادق',
          journals: journals
        } as MagazineData;
      })
    );
  }

  getJournals(): Observable<Journal[]> {
    return this.getMagazineData().pipe(map(data => data.journals));
  }
}
