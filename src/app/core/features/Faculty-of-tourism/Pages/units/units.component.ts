import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { Unit, UnitsTabsData } from '../../model/unit.model';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  unitData!: UnitsTabsData;
  selectedTab: string = '';

  constructor(
    private unitsService: UnitsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitsService.getUnitsTabsData().subscribe(data => {
      this.unitData = data;
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

  getMembersCount(unit: Unit): number {
    return unit.members?.length || 0;
  }
}
