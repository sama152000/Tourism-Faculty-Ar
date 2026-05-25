import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { News, NewsPost, PostCategory } from '../model/news.model';
import { Category } from '../model/category.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = environment.apiUrl + 'posts';
  private categoriesUrl = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) {}

  /**
   * جلب الأخبار بالـ pagination مع فلترة اختيارية
   * يدعم: pageNumber, pageSize, categoryId, title (بحث), status
   */
  getPagedNews(
    pageNumber: number,
    pageSize: number,
    filter: { categoryId?: string; title?: string; status?: string; type?: string } = {}
  ): Observable<{ items: News[]; totalCount: number }> {
    const body: any = {
      pageNumber,
      pageSize,
      filter,
      orderByValue: [{ colId: 'createdDate', sort: 'desc' }]
    };

    return this.http.post<any>(`${this.baseUrl}/getpaged`, body).pipe(
      map(response => {
        // API may return data as array or as { items, totalCount }
        let items: News[];
        let totalCount: number;

        if (Array.isArray(response.data)) {
          items = response.data;
          totalCount = response.totalCount ?? items.length;
        } else if (response.data?.items) {
          items = response.data.items;
          totalCount = response.data.totalCount ?? items.length;
        } else {
          items = [];
          totalCount = 0;
        }

        return { items, totalCount };
      })
    );
  }

  /** جلب كل التصنيفات */
  getCategories(): Observable<Category[]> {
    return this.http.get<{ success: boolean; data: Category[] }>(`${this.categoriesUrl}/getall`).pipe(
      map(response => response.data)
    );
  }

  /** جلب خبر واحد بالـ id */
  getNewsById(id: string): Observable<News> {
    return this.http.get<{ success: boolean; data: News }>(`${this.baseUrl}/get/${id}`).pipe(
      map(response => response.data)
    );
  }

  /** الأخبار المرتبطة بنفس التصنيف */
  getRelatedNews(post: News, limit: number = 4): Observable<News[]> {
    const categoryIds = post.postCategories.map(c => c.categoryId);
    // Use first category for related filter
    const filter: any = { status: 'Published' };
    if (categoryIds.length > 0) {
      filter.categoryId = categoryIds[0];
    }
    return this.getPagedNews(1, limit + 1, filter).pipe(
      map(result => result.items.filter(p => p.id !== post.id).slice(0, limit))
    );
  }

  /** جلب آخر الأخبار للـ Home (type=0 فقط، بدون أحداث) */
  getLatestNews(limit: number = 4): Observable<News[]> {
    // Request extra items to account for any server-side filtering inconsistency,
    // then filter client-side to exclude events (type !== 0 and type !== '0')
    return this.getPagedNews(1, limit * 2, { status: 'Published', type: '0' }).pipe(
      map(result =>
        result.items
          .filter(p => p.type === 0 || p.type === '0')
          .slice(0, limit)
      )
    );
  }

  /** جلب آخر الأحداث (Events) */
  getLatestEvents(limit: number = 3): Observable<News[]> {
    return this.getCategories().pipe(
      map(categories =>
        categories.find(c =>
          c.name === 'فاعليات' || c.name === 'احداث' || c.name.toLowerCase() === 'events'
        )
      ),
      switchMap(category => {
        const filter: any = { status: 'Published' };
        if (category) {
          filter.categoryId = category.id;
        }
        return this.getPagedNews(1, limit, filter);
      }),
      map(result => result.items)
    );
  }
}
