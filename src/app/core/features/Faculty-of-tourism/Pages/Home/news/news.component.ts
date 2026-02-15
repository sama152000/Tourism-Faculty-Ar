import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../Services/news.service';
import { NewsPost, } from '../../../model/news.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink,Router} from "@angular/router";


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl:'./news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsPosts: NewsPost[] = [];
  newsData: { news: NewsPost[] } = { news: [] };
  @Input() limit: number = 3; // default limit for home page

  constructor(private newsService: NewsService,private router:Router) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe(posts => {
      // فلترة الأخبار فقط
      const newsOnly = posts.filter(p =>
        p.postCategories.some(c => c.categoryName === 'أخبار')
      );
      this.newsPosts = newsOnly.slice(0, this.limit);
      this.newsData.news = this.newsPosts;
    });
  }

  
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
   goToPost(post: NewsPost): void {
    if (!post.slug) {
      this.handleMissingSlug();
      return;
    }

    this.router.navigate(['/news', post.slug]);
  }

  handleMissingSlug(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Simple user feedback for now
    // You can replace with a toast service if available
    console.warn('Post has no slug; cannot navigate to details.');
  }

  navigateToPost(slug: string): void {
    this.router.navigate(['/news', slug]).then(() => {
      this.loadPostDetails(slug);
      window.scrollTo(0, 0);
    });
  }

  loadPostDetails(slug: string): void {
    // Logic to load post details if needed
  }
}
