import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../Services/centers.service';
import { CentersTabsData, Center } from '../../model/center.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe'; // ✅ استدعاء الـ Pipe


@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {
  centerData!: CentersTabsData;
  selectedTab: string = '';

  constructor(
    private centersService: CentersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get initial tab from route params first
    const initialSlug = this.route.snapshot.paramMap.get('slug');
    
    this.centersService.getCentersTabsData().subscribe(data => {
      this.centerData = data;

      // Set selectedTab based on route param or default to first section
      if (initialSlug) {
        this.selectedTab = initialSlug;
      } else if (data.sections.length) {
        this.selectedTab = data.sections[0].slug!;
      }

      // Subscribe to route params for changes
      this.route.params.subscribe(params => {
        if (params['slug'] && params['slug'] !== this.selectedTab) {
          this.selectedTab = params['slug'];
        }
      });
    });
  }

  // ✅ onTabChange بالـ slug
  onTabChange(slug: string): void {
    this.selectedTab = slug;
    this.router.navigate(['/centers', slug]);
  }

  getMembersCount(center: Center): number {
    return center.members?.length || 0;
  }
}
