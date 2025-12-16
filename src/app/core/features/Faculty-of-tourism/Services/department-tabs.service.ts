import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Department, DepartmentTabsData } from '../model/departments.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentTabsService {
  constructor(private http: HttpClient) {}

  getDepartmentTabsData(): Observable<DepartmentTabsData> {
    const departments$ = this.http.get<any>(`${environment.apiUrl}departments/getall`);
    const details$ = this.http.get<any>(`${environment.apiUrl}departmentdetails/getall`);
    const members$ = this.http.get<any>(`${environment.apiUrl}departmentmembers/getall`);
    const programs$ = this.http.get<any>(`${environment.apiUrl}departmentprograms/getall`);
    const services$ = this.http.get<any>(`${environment.apiUrl}departmentservices/getall`);

    return forkJoin([departments$, details$, members$, programs$, services$]).pipe(
      map(([departmentsRes, detailsRes, membersRes, programsRes, servicesRes]) => {
        const departments: Department[] = departmentsRes.data.map((dept: any) => ({
          ...dept,
          details: detailsRes.data.filter((d: any) => d.departmentId === dept.id),
          members: membersRes.data.filter((m: any) => m.departmentId === dept.id),
          programs: programsRes.data.filter((p: any) => p.departmentId === dept.id),
          services: servicesRes.data.filter((s: any) => s.departmentId === dept.id)
        }));

        return {
          title: 'الأقسام العلمية',
          subtitle: 'تعرف على أقسام الكلية المختلفة',
          sections: departments
        } as DepartmentTabsData;
      })
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.getDepartmentTabsData().pipe(map(data => data.sections));
  }
}
