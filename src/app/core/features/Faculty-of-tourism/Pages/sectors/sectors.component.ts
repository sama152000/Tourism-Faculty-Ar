import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../../Services/sectors.service';
import { Sector, SectorsTabsData } from '../../model/sector.model';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [CommonModule],
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
        this.selectedTab = data.sections[0].id;
      }

      this.route.queryParams.subscribe(params => {
        if (params['tab']) {
          this.selectedTab = params['tab'];
        }
      });
    });
  }

  onTabChange(id: string): void {
    this.selectedTab = id;
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
