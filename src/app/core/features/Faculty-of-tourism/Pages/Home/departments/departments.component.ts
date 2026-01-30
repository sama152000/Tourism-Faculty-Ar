import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentTabsService } from '../../../Services/department-tabs.service';
import { DepartmentTabsData, Department } from '../../../model/departments.model';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentData!: DepartmentTabsData;
  displayedDepartments: Department[] = [];
  selectedTab: string = '';

  constructor(
    private departmentTabsService: DepartmentTabsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmentTabsService.getDepartmentTabsData().subscribe(data => {
      this.departmentData = data;
      this.displayedDepartments = data.sections;

      // لو مفيش params، اختار أول قسم افتراضي
      if (data.sections.length) {
        this.selectedTab = data.sections[0].slug!;
      }

      // ✅ هنا نقرأ الـ route params بدل queryParams
      this.route.params.subscribe(params => {
        if (params['slug']) {
          this.selectedTab = params['slug'];
        }
      });
    });
  }

  onTabChange(slug: string): void {
    this.selectedTab = slug;
    this.router.navigate(['/departments', slug]); // ✅ التنقل بالـ slug
  }

  getFacultyCount(department: Department): number {
    return department.members?.length || 0;
  }

  getServicesCount(department: Department): number {
    return department.services?.length || 0;
  }

  getDeptFeatures(department: Department): string[] {
    return [
      `أعضاء الهيئة: ${this.getFacultyCount(department)}`,
      `الخدمات: ${this.getServicesCount(department)}`,
      `البرامج: ${department.programs?.length || 0}`
    ];
  }
}
