import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Sector, SectorsTabsData } from '../model/sector.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  constructor(private http: HttpClient) {}

  getSectorsTabsData(): Observable<SectorsTabsData> {
    const sectors$ = this.http.get<any>(`${environment.apiUrl}sectors/getall`);
    const details$ = this.http.get<any>(`${environment.apiUrl}sectordetails/getall`);
    const members$ = this.http.get<any>(`${environment.apiUrl}sectormember/getall`);
    const posts$ = this.http.get<any>(`${environment.apiUrl}sectorposts/getall`);
    const programs$ = this.http.get<any>(`${environment.apiUrl}sectorprograms/getall`);
    const services$ = this.http.get<any>(`${environment.apiUrl}sectorservices/getall`);
    const units$ = this.http.get<any>(`${environment.apiUrl}sectorunits/getall`);

    return forkJoin([sectors$, details$, members$, posts$, programs$, services$, units$]).pipe(
      map(([sectorsRes, detailsRes, membersRes, postsRes, programsRes, servicesRes, unitsRes]) => {
        const sectors: Sector[] = sectorsRes.data.map((sector: any) => ({
          ...sector,
          details: detailsRes.data.filter((d: any) => d.sectorId === sector.id),
          members: membersRes.data.filter((m: any) => m.sectorId === sector.id),
          posts: postsRes.data.filter((p: any) => p.sectorId === sector.id),
          programs: programsRes.data.filter((pr: any) => pr.sectorId === sector.id),
          services: servicesRes.data.filter((s: any) => s.sectorId === sector.id),
          units: unitsRes.data.filter((u: any) => u.sectorId === sector.id)
        }));

        return {
          title: 'القطاعات',
          subtitle: 'تعرف على القطاعات المختلفة داخل الكلية',
          sections: sectors
        } as SectorsTabsData;
      })
    );
  }

  getSectors(): Observable<Sector[]> {
    return this.getSectorsTabsData().pipe(map(data => data.sections));
  }
}
