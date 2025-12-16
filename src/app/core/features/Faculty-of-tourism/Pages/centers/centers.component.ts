import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CentersService } from '../../Services/centers.service';
import { CentersTabsData, Center } from '../../model/center.model';

@Component({
  selector: 'app-centers',
  standalone: true,
  imports: [CommonModule],
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
    this.centersService.getCentersTabsData().subscribe(data => {
      this.centerData = data;
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

  getMembersCount(center: Center): number {
    return center.members?.length || 0;
  }
}
