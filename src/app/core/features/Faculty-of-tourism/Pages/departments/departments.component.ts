import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentTabsService } from '../../Services/department-tabs.service';
import { DepartmentTabsData, Department } from '../../model/departments.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe'; // ✅ استدعاء الـ Pipe


@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentData!: DepartmentTabsData;
  selectedTab: string = '';

  constructor(
    private departmentTabsService: DepartmentTabsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get initial tab from route params first
    const initialSlug = this.route.snapshot.paramMap.get('slug');
    
    this.departmentTabsService.getDepartmentTabsData().subscribe(data => {
      this.departmentData = data;

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

  onTabChange(slug: string): void {
    this.selectedTab = slug;
    this.router.navigate(['/departments', slug]);
  }

  getFacultyCount(department: Department): number {
    return department.members?.length || 0;
  }

  getServicesCount(department: Department): number {
    return department.services?.length || 0;
  }
}
