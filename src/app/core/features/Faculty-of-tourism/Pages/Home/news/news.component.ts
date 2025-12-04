import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsData } from '../../../model/news.model';
import { ContentService } from '../../../Services/content.service';
import { ContentItem } from '../../../model/content.model';
import { Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsData!: NewsData;
  @Input() limit: number = 3; // default limit for home page

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    // Fetch only news items from the central ContentService and map to UI model
    const items: ContentItem[] = this.contentService.getContentByCategory('news');
    const limited = items.slice(0, this.limit);
    this.newsData = {
      title: 'اخر الاخبار',
      news: limited.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        image: item.image,
        date: item.date,
        link: item.link || `/news-details/${item.id}`
      })),
      viewAllLink: '/news-list'
    };
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}