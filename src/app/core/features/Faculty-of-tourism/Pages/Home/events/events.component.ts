import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsData } from '../../../model/events.model';
import { ContentService } from '../../../Services/content.service';
import { ContentItem } from '../../../model/content.model';
import { Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsData!: EventsData;
  @Input() limit: number = 2; // default limit for home page - show 2 items in the home layout

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    // Fetch only events from the central ContentService and map to UI model
    const items: ContentItem[] = this.contentService.getContentByCategory('events').slice(0,3);
    // Use all events (do not filter out past events); sort by date descending (newest first)
    const source = items.slice();
    source.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const limited = source.slice(0, this.limit);
    this.eventsData = {
      title: 'الاحداث والفعاليات',
      events: limited.map(item => ({
        id: item.id,
        title: item.title,
        description: item.excerpt,
        image: item.image,
        date: new Date(item.date),
        link: item.link || `/events/${item.id}`
      })),
      viewAllLink: '/news-list'
    };
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTimeUntilEvent(eventDate: Date): string {
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'انتهى الحدث';
    } else if (diffDays === 0) {
      return 'اليوم';
    } else if (diffDays === 1) {
      return 'غدًا';
    } else if (diffDays <= 7) {
      return `في غضون ${diffDays} أيام`;
    } else if (diffDays <= 30) {
      return `في غضون ${Math.ceil(diffDays / 7)} أسابيع`;
    } else {
      return `في غضون ${Math.ceil(diffDays / 30)} أشهر`;
    }
  }

}