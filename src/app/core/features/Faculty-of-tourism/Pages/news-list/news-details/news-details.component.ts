import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../../Services/news.service';
import { NewsPost } from '../../../model/news.model';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  post: NewsPost | undefined;
  relatedPosts: NewsPost[] = [];
  nextPost: NewsPost | undefined;
  previousPost: NewsPost | undefined;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPostDetails(id);
      }
    });
  }

  loadPostDetails(id: string): void {
    this.newsService.getNews().subscribe(posts => {
      this.post = posts.find(p => p.id === id);

      if (this.post) {
        // related posts: نفس التصنيف
        const categoryNames = this.post.postCategories.map(c => c.categoryName);
        this.relatedPosts = posts.filter(
          p => p.id !== id && p.postCategories.some(c => categoryNames.includes(c.categoryName))
        );

        // ترتيب حسب التاريخ
        const sorted = [...posts].sort(
          (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        );
        const index = sorted.findIndex(p => p.id === id);
        this.previousPost = index > 0 ? sorted[index - 1] : undefined;
        this.nextPost = index < sorted.length - 1 ? sorted[index + 1] : undefined;
      } else {
        this.router.navigate(['/news-list']);
      }
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

  navigateToPost(id: string): void {
    this.router.navigate(['/news-details', id]).then(() => {
      this.loadPostDetails(id);
      window.scrollTo(0, 0);
    });
  }

  sharePost(): void {
    if (navigator.share && this.post) {
      navigator.share({
        title: this.post.title,
        text: this.post.content.slice(0, 100),
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }
}
