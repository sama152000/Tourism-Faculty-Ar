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
    this.newsService.getLatestNews(this.limit).subscribe(posts => {
      this.newsPosts = posts;
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
    this.router.navigate(['/news', post.id]);
  }

  handleMissingSlug(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  navigateToPost(id: string): void {
    this.router.navigate(['/news', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  loadPostDetails(id: string): void {
    // reserved for future use
  }
}
