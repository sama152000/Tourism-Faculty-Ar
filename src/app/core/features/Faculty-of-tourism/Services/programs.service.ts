import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Program, ProgramsTabsData } from '../model/program.model';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  constructor(private http: HttpClient) {}

  getProgramsTabsData(): Observable<ProgramsTabsData> {
    const programs$ = this.http.get<any>(`${environment.apiUrl}program/getall`);
    const details$ = this.http.get<any>(`${environment.apiUrl}programdetail/getall`);
    const members$ = this.http.get<any>(`${environment.apiUrl}programmember/getall`);

    return forkJoin([programs$, details$, members$]).pipe(
      map(([programsRes, detailsRes, membersRes]) => {
        const programs: Program[] = programsRes.data.map((prog: any) => ({
          ...prog,
          details: detailsRes.data.filter((d: any) => d.programId === prog.id),
          members: membersRes.data.filter((m: any) => m.programId === prog.id)
        }));

        return {
          title: 'برامج الكلية',
          subtitle: 'تعرف على البرامج الأكاديمية المتاحة',
          sections: programs
        } as ProgramsTabsData;
      })
    );
  }

  getPrograms(): Observable<Program[]> {
    return this.getProgramsTabsData().pipe(map(data => data.sections));
  }
}
