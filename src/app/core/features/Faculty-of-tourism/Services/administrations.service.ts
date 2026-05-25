import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Administration, AdministrationsTabsData } from '../model/administration.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationsService {
  constructor(private http: HttpClient) {}

  getAdministrationsTabsData(): Observable<AdministrationsTabsData> {
    const managements$ = this.http.get<any>(`${environment.apiUrl}management/getall`);
    const details$     = this.http.get<any>(`${environment.apiUrl}managementdetail/getall`);
    const members$     = this.http.get<any>(`${environment.apiUrl}managementmember/getall`);

    return forkJoin([managements$, details$, members$]).pipe(
      map(([managementsRes, detailsRes, membersRes]) => {
        const sections: Administration[] = managementsRes.data.map((mgmt: any) => ({
          ...mgmt,
          slug: mgmt.slug || mgmt.managementTitleEn || mgmt.id,
          details: detailsRes.data.filter((d: any) => d.managementId === mgmt.id),
          members: membersRes.data.filter((m: any) => m.managementId === mgmt.id)
        }));

        return {
          title: 'الإدارات',
          subtitle: 'تعرف على الإدارات التابعة للكلية',
          sections
        } as AdministrationsTabsData;
      })
    );
  }

  getAdministrations(): Observable<Administration[]> {
    return this.getAdministrationsTabsData().pipe(map(data => data.sections));
  }
}
