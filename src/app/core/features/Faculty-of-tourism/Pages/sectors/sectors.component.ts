import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../../Services/sectors.service';
import { Sector, SectorsTabsData } from '../../model/sector.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe'; // ✅ استدعاء الـ Pipe


@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent implements OnInit {
  sectorData!: SectorsTabsData;
  selectedTab: string = '';

  constructor(
    private sectorsService: SectorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get initial tab from route params first
    const initialSlug = this.route.snapshot.paramMap.get('slug');
    
    this.sectorsService.getSectorsTabsData().subscribe(data => {
      this.sectorData = data;

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
    this.router.navigate(['/sectors', slug]);
  }

  getMembersCount(sector: Sector): number {
    return sector.members?.length || 0;
  }
}
