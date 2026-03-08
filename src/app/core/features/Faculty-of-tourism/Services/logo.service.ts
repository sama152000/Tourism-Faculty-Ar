import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Logo, LogoResponse } from '../model/logo.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private apiUrl = environment.apiUrl + 'logos/getall';
  private cachedLogo: string | null = null;

  constructor(private http: HttpClient) {}

  /** جلب اللوجو من الـ API */
  getLogo(): Observable<string> {
    return this.http.get<LogoResponse>(this.apiUrl).pipe(
      map(response => {
        if (response.success && response.data && response.data.length > 0) {
          this.cachedLogo = response.data[0].url;
          return response.data[0].url;
        }
        // في حال عدم وجود لوجو، نرجع اللوجو الافتراضي
        return './assets/tour-logo.jpg';
      })
    );
  }

  /** جلب اللوجو المخزن مؤقتاً (لاستخدامه بدون انتظار) */
  getCachedLogo(): string {
    return this.cachedLogo || './assets/tour-logo.jpg';
  }
}
