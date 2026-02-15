import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutTabsService } from '../../Services/about-tabs.service';
import { AboutSection, AboutTabsData } from '../../model/about-faculty.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe'; // ✅ استدعاء الـ Pipe

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  // initialize with defaults to avoid template binding errors in early lifecycle
  aboutData: AboutTabsData = {
    title: '',
    subtitle: '',
    sections: []
  };
  selectedTab: string = '';

  constructor(
    private aboutTabsService: AboutTabsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aboutTabsService.getAboutTabsData().subscribe(data => {
      this.aboutData = data;
      console.log('[AboutUs] aboutData loaded:', this.aboutData);

      if (data.sections.length) {
        // ✅ أول تاب افتراضي بالـ slug بدل id
        this.selectedTab = data.sections[0].slug!;
      }

      this.route.queryParams.subscribe(params => {
        if (params['tab']) {
          this.selectedTab = params['tab'];
        }
      });
    });
  }

  // ✅ onTabChange بالـ slug
  onTabChange(slug: string): void {
    this.selectedTab = slug;

    // Update URL without reloading
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: this.selectedTab },
      queryParamsHandling: 'merge'
    });
  }

  formatContent(content?: string): string[] {
    const text = content || '';
    return text.split('\n').filter(line => line.trim() !== '');
  }

  // Method to parse goals content and return array for list rendering
  getGoalsList(content: string): string[] {
    if (!content) return [];
    // Split by newlines and remove bullet point characters (• or -)
    return content
      .split('\n')
      .map(line => line.replace(/^[•\-]\s*/, '').trim())
      .filter(line => line !== '');
  }
}
