import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutTabsService } from '../../Services/about-tabs.service';
import { AboutSection, AboutTabsData } from '../../model/about-faculty.model';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
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
  selectedTab: string = 'vision-mission';

  constructor(
    private aboutTabsService: AboutTabsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.aboutTabsService.getAboutTabsData().subscribe(data => {
    this.aboutData = data;
    console.log('[AboutUs] aboutData loaded:', this.aboutData);

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.selectedTab = params['tab'];
      }
    });
  });
}


  onTabChange(tabId: string): void {
    this.selectedTab = tabId;

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
}