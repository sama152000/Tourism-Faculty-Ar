import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { NewsPost, NewsCategory, NewsTabsData } from '../model/news.model';
import { map, Observable } from 'rxjs';
import { slugify } from '../../../../utilities/slug.util'; // ✅ استدعاء الدالة

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNewsTabsData(): Observable<NewsTabsData> {
    return this.http.get<any>(`${environment.apiUrl}posts/getall`).pipe(
      map(res => {
        const posts: NewsPost[] = res.data.map((post: any) => {
          // Generate slug from title - always prefer title for Arabic content
          const s = slugify(post.title || post.urlTitleEn || '');
          return {
            ...post,
            slug: s || `news-${post.id}` // Always have a slug
          } as NewsPost;
        });

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
      map(res => res.data.map((post: any) => {
        // Generate slug from title - always prefer title for Arabic content
        const s = slugify(post.title || post.urlTitleEn || '');
        return { ...post, slug: s || `news-${post.id}` } as NewsPost;
      }))
    );
  }

  getLatestNews(limit: number = 3): Observable<NewsPost[]> {
    return this.http.get<any>(`${environment.apiUrl}posts/getall`).pipe(
      map(res => {
        const posts: NewsPost[] = res.data.map((post: any) => {
          // Generate slug from title - always prefer title for Arabic content
          const s = slugify(post.title || post.urlTitleEn || '');
          return { ...post, slug: s || `news-${post.id}` } as NewsPost;
        });

        // Sort by createdDate descending (newest first)
        const sortedPosts = posts.sort((a, b) => {
          const dateA = new Date(a.createdDate).getTime();
          const dateB = new Date(b.createdDate).getTime();
          return dateB - dateA;
        });

        // Filter for news category and take only the latest 'limit' items
        const newsOnly = sortedPosts.filter(p =>
          p.postCategories.some(c => c.categoryName === 'أخبار')
        );

        return newsOnly.slice(0, limit);
      })
    );
  }

  getLatestEvents(limit: number = 3): Observable<NewsPost[]> {
    return this.http.get<any>(`${environment.apiUrl}posts/getall`).pipe(
      map(res => {
        const posts: NewsPost[] = res.data.map((post: any) => {
          // Generate slug from title - always prefer title for Arabic content
          const s = slugify(post.title || post.urlTitleEn || '');
          return { ...post, slug: s || `news-${post.id}` } as NewsPost;
        });

        // Sort by createdDate descending (newest first)
        const sortedPosts = posts.sort((a, b) => {
          const dateA = new Date(a.createdDate).getTime();
          const dateB = new Date(b.createdDate).getTime();
          return dateB - dateA;
        });

        // Filter for events category and take only the latest 'limit' items
        const eventsOnly = sortedPosts.filter(p =>
          p.postCategories.some(c => c.categoryName === 'حدث')
        );

        return eventsOnly.slice(0, limit);
      })
    );
  }
}
