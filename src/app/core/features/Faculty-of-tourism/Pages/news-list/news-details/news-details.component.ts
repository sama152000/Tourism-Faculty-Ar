import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContentService } from '../../../Services/content.service';
import { ContentItem } from '../../../model/content.model';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  contentItem: ContentItem | undefined;
  relatedContent: ContentItem[] = [];
  nextContent: ContentItem | undefined;
  previousContent: ContentItem | undefined;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadContentDetails(id);
      }
    });
  }

  loadContentDetails(id: string): void {
    this.contentItem = this.contentService.getContentById(id);
    
    if (this.contentItem) {
      this.relatedContent = this.contentService.getRelatedContent(this.contentItem.category, id);
      this.nextContent = this.contentService.getNextContent(id);
      this.previousContent = this.contentService.getPreviousContent(id);
    } else {
      // Redirect to news list if content not found
      this.router.navigate(['/news-list']);
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getCategoryLabel(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
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

  navigateToContent(id: string): void {
    this.router.navigate(['/news-details', id]).then(() => {
      this.loadContentDetails(id);
      window.scrollTo(0, 0);
    });
  }

  shareContent(): void {
    if (navigator.share && this.contentItem) {
      navigator.share({
        title: this.contentItem.title,
        text: this.contentItem.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  }
}