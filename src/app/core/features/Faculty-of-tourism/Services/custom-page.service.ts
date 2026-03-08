import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { CustomPage, ApiResponse } from '../model/custom-page.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomPageService {

  private apiUrl = environment.apiUrl + 'customepages';
  private cachedPages: CustomPage[] = [];

  constructor(private http: HttpClient) {}

  // Get all custom pages
  getAllPages(): Observable<CustomPage[]> {
    if (this.cachedPages.length > 0) {
      return of(this.cachedPages);
    }
    return this.http.get<ApiResponse<CustomPage[]>>(`${this.apiUrl}/getall`).pipe(
      map(response => {
        this.cachedPages = response.data;
        return response.data;
      })
    );
  }

  // Get single page by slug - use cached pages to avoid API errors
  getPageBySlug(slug: string): Observable<CustomPage> {
    return this.getAllPages().pipe(
      map(pages => {
        const page = pages.find(p => 
          p.slug?.toLowerCase() === slug.toLowerCase()
        );
        if (!page) {
          throw new Error('Page not found');
        }
        return page;
      })
    );
  }
}
