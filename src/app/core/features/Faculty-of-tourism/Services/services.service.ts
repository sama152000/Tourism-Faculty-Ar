import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Service, ServicesTabsData } from '../model/service.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  getServicesTabsData(): Observable<ServicesTabsData> {
    return this.http.get<any>(`${environment.apiUrl}services/getall`).pipe(
      map(res => {
        const services: Service[] = res.data.map((s: any) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          iconPath: s.iconPath,
          isActive: s.isActive
        }));

        return {
          title: 'الخدمات',
          subtitle: 'تعرف على الخدمات المقدمة داخل الكلية',
          sections: services
        } as ServicesTabsData;
      })
    );
  }

  getServices(): Observable<Service[]> {
    return this.getServicesTabsData().pipe(map(data => data.sections));
  }
}
