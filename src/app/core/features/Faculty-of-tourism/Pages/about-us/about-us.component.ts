import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AboutTabsService } from '../../Services/about-tabs.service';
import { AboutSection, AboutTabsData } from '../../model/about-faculty.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe, RouterModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, OnDestroy {
  aboutData: AboutTabsData = {
    title: '',
    subtitle: '',
    sections: []
  };
  selectedTab: string = '';
  private routeSub?: Subscription;

  constructor(
    private aboutTabsService: AboutTabsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get initial tab from route params first
    const initialTab = this.route.snapshot.paramMap.get('slug');
    
    // Load data
    this.aboutTabsService.getAboutTabsData().subscribe(data => {
      this.aboutData = data;

      // Set selectedTab based on route param or default to first section
      if (initialTab) {
        this.selectedTab = initialTab;
      } else if (data.sections.length) {
        this.selectedTab = data.sections[0].slug!;
      }

      // Subscribe to route params for changes
      this.routeSub = this.route.paramMap.subscribe(params => {
        const slug = params.get('slug');
        
        if (slug && slug !== this.selectedTab) {
          this.selectedTab = slug;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  // ✅ onTabChange بالـ slug وتحديث الـ route
  onTabChange(slug: string | undefined): void {
    if (!slug) return;
    this.selectedTab = slug;

    // Update URL without reloading - navigate to /about/:slug
    this.router.navigate(['/about', slug]);
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
