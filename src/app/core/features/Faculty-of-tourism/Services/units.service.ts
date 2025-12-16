import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Unit, UnitsTabsData } from '../model/unit.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  constructor(private http: HttpClient) {}

  getUnitsTabsData(): Observable<UnitsTabsData> {
    const units$ = this.http.get<any>(`${environment.apiUrl}unit/getall`);
    const details$ = this.http.get<any>(`${environment.apiUrl}unitdetail/getall`);
    const members$ = this.http.get<any>(`${environment.apiUrl}unitmember/getall`);

    return forkJoin([units$, details$, members$]).pipe(
      map(([unitsRes, detailsRes, membersRes]) => {
        const units: Unit[] = unitsRes.data.map((unit: any) => ({
          ...unit,
          details: detailsRes.data.filter((d: any) => d.unitId === unit.id),
          members: membersRes.data.filter((m: any) => m.unitId === unit.id)
        }));

        return {
          title: 'الوحدات',
          subtitle: 'تعرف على الوحدات التابعة للكلية',
          sections: units
        } as UnitsTabsData;
      })
    );
  }

  getUnits(): Observable<Unit[]> {
    return this.getUnitsTabsData().pipe(map(data => data.sections));
  }
}
