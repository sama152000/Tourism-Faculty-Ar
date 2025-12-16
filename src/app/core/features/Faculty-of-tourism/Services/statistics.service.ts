import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Statistic, StatisticsData } from '../model/statistics.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStatisticsData(): Observable<StatisticsData> {
    return this.http.get<any>(`${environment.apiUrl}statistics/getall`).pipe(
      map(res => {
        const stats: Statistic[] = res.data.map((s: any) => ({
          id: s.id,
          title: s.title,
          value: s.value,
          iconPath: s.iconPath,
          isActive: s.isActive
        }));

        return {
          title: 'إحصائيات الكلية',
          subtitle: 'تعرف على أبرز أرقام وإنجازات كلية السياحة والفنادق',
          items: stats
        } as StatisticsData;
      })
    );
  }

  getStatistics(): Observable<Statistic[]> {
    return this.getStatisticsData().pipe(map(data => data.items));
  }
}
