import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { Unit, UnitTabsData } from '../../model/unit.model';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  unitData!: UnitTabsData;
  selectedTab: string = 'quality-assurance';

  constructor(
    private unitsService: UnitsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.unitData = this.unitsService.getUnitTabsData();

    // Handle query parameters for tab selection
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.selectedTab = params['tab'];
      }
    });
  }

  onTabChange(value: string | number | undefined): void {
    if (value) {
      this.selectedTab = value.toString();

      // Update URL without reloading
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab: this.selectedTab },
        queryParamsHandling: 'merge'
      });
    }
  }
}