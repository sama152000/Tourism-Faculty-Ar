import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContentService } from '../../Services/content.service';
import { ContentItem } from '../../model/content.model';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  contentItems: ContentItem[] = [];
  selectedCategory: string = 'all';
  categories = [
    { id: 'all', label: 'الكل', count: 0 },
    { id: 'news', label: 'الأخبار', count: 0 },
    { id: 'articles', label: 'المقالات', count: 0 },
    { id: 'announcements', label: 'الإعلانات', count: 0 },
    { id: 'events', label: 'الفعاليات', count: 0 }
  ];

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContent();
    this.updateCategoryCounts();

    // Handle query parameters for category selection
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.loadContent();
      }
    });
  }

  loadContent(): void {
    this.contentItems = this.contentService.getContentByCategory(this.selectedCategory);
  }

  updateCategoryCounts(): void {
    const allContent = this.contentService.getAllContent();
    this.categories[0].count = allContent.length; // الكل
    this.categories[1].count = allContent.filter(item => item.category === 'news').length;
    this.categories[2].count = allContent.filter(item => item.category === 'articles').length;
    this.categories[3].count = allContent.filter(item => item.category === 'announcements').length;
    this.categories[4].count = allContent.filter(item => item.category === 'events').length;
  }

  onTabChange(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.loadContent();

    // Update URL without reloading
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryId === 'all' ? null : categoryId },
      queryParamsHandling: 'merge'
    });
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'all': 'الكل',
      'news': 'خبر',
      'articles': 'مقال',
      'announcements': 'إعلان',
      'events': 'فعالية'
    };
    return labels[category] || category;
  }

  getCategoryColor(category: string): string {
    const colors = {
      'news': '#4A4A4A',
      'articles': '#b68c2d',
      'announcements': '#28a745',
      'events': '#dc3545'
    };
    return colors[category as keyof typeof colors] || '#4A4A4A';
  }
}