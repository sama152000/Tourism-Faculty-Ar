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
    this.sectorsService.getSectorsTabsData().subscribe(data => {
      this.sectorData = data;
      if (data.sections.length) {
        // ✅ أول قطاع افتراضي بالـ slug بدل id
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: this.selectedTab },
      queryParamsHandling: 'merge'
    });
  }

  getMembersCount(sector: Sector): number {
    return sector.members?.length || 0;
  }
}
