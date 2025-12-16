import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsService } from '../../Services/news.service';
import { NewsTabsData, NewsPost } from '../../model/news.model';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsData!: NewsTabsData;
  selectedCategory: string = 'الكل';

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newsService.getNewsTabsData().subscribe(data => {
      this.newsData = {
        ...data,
        sections: [
          { categoryName: 'الكل', posts: data.sections.flatMap(s => s.posts) },
          ...data.sections
        ]
      };

      this.route.queryParams.subscribe(params => {
        if (params['category']) {
          this.selectedCategory = params['category'];
        }
      });
    });
  }

  onTabChange(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryName },
      queryParamsHandling: 'merge'
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

  get selectedPosts(): NewsPost[] {
    const section = this.newsData.sections.find(s => s.categoryName === this.selectedCategory);
    return section ? section.posts : [];
  }
}
