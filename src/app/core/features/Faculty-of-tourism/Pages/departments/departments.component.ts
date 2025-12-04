import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentTabsService } from '../../Services/department-tabs.service';
import { DepartmentDetail, DepartmentTabsData } from '../../model/departments.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentData!: DepartmentTabsData;
  selectedTab: string = 'tourism-studies';

  constructor(
    private departmentTabsService: DepartmentTabsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmentData = this.departmentTabsService.getDepartmentTabsData();

    // Handle route parameters for department id
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.selectedTab = this.mapIdToTab(params['id']);
      }
    });
  }

  private mapIdToTab(id: string): string {
    const idMap: { [key: string]: string } = {
      '1': 'tourism-studies',
      '2': 'hotel-management',
      '3': 'guidance-interpretation',
      '4': 'sustainable-tourism'
    };
    return idMap[id] || 'tourism-studies'; // default to first tab
  }

  onTabChange(value: string | number | undefined): void {
    if (value) {
      this.selectedTab = value.toString();

      // Update URL with department id
      const id = this.mapTabToId(this.selectedTab);
      this.router.navigate(['/departments', id]);
    }
  }

  private mapTabToId(tab: string): string {
    const tabMap: { [key: string]: string } = {
      'tourism-studies': '1',
      'hotel-management': '2',
      'guidance-interpretation': '3',
      'sustainable-tourism': '4'
    };
    return tabMap[tab] || '1'; // default to first
  }
}