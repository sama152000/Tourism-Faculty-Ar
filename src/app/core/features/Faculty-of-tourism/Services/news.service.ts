import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { NewsPost, NewsCategory, NewsTabsData } from '../model/news.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNewsTabsData(): Observable<NewsTabsData> {
    return this.http.get<any>(`${environment.apiUrl}posts/getall`).pipe(
      map(res => {
        const posts: NewsPost[] = res.data;

        // تجميع الأخبار حسب الـ categoryName
        const categoryMap: { [key: string]: NewsPost[] } = {};
        posts.forEach(post => {
          post.postCategories.forEach(cat => {
            if (!categoryMap[cat.categoryName]) {
              categoryMap[cat.categoryName] = [];
            }
            categoryMap[cat.categoryName].push(post);
          });
        });

        const categories: NewsCategory[] = Object.keys(categoryMap).map(name => ({
          categoryName: name,
          posts: categoryMap[name]
        }));

        return {
          title: 'الأخبار والفعاليات',
          subtitle: 'تابع أحدث الأخبار والفعاليات الخاصة بالكلية',
          sections: categories
        } as NewsTabsData;
      })
    );
  }

  getNews(): Observable<NewsPost[]> {
    return this.http.get<any>(`${environment.apiUrl}posts/getall`).pipe(
      map(res => res.data as NewsPost[])
    );
  }
}
