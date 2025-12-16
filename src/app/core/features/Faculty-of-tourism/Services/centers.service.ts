import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Center, CentersTabsData } from '../model/center.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentersService {
  constructor(private http: HttpClient) {}

  getCentersTabsData(): Observable<CentersTabsData> {
    const centers$ = this.http.get<any>(`${environment.apiUrl}center/getall`);
    const details$ = this.http.get<any>(`${environment.apiUrl}centerdetail/getall`);
    const members$ = this.http.get<any>(`${environment.apiUrl}centermember/getall`);

    return forkJoin([centers$, details$, members$]).pipe(
      map(([centersRes, detailsRes, membersRes]) => {
        const centers: Center[] = centersRes.data.map((center: any) => ({
          ...center,
          details: detailsRes.data.filter((d: any) => d.centerId === center.id),
          members: membersRes.data.filter((m: any) => m.centerId === center.id)
        }));

        return {
          title: 'المراكز',
          subtitle: 'تعرف على المراكز التابعة للكلية',
          sections: centers
        } as CentersTabsData;
      })
    );
  }

  getCenters(): Observable<Center[]> {
    return this.getCentersTabsData().pipe(map(data => data.sections));
  }
}
