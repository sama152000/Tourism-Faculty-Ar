import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentTabsService } from '../../../Services/department-tabs.service';
import { DepartmentsData } from '../../../model/departments.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DepartmentsService } from '../../../Services/departments.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentsData!: DepartmentsData;

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    const data = this.departmentsService.getDepartmentsData();
    this.departmentsData = {
      ...data,
      departments: data.departments.slice(0, 3)
    };
  }

  getDeptFeatures(deptId: string): string[] {
    const features: { [key: string]: string[] } = {
      '1': ['المواقع التراثية', 'تخطيط الرحلات', 'الدراسات الثقافية'],
      '2': ['العمليات الفندقية', 'إدارة الأغذية والمشروبات', 'جودة الخدمة'],
      '3': ['الإرشاد السياحي الاحترافي', 'التفسير التراثي', 'مهارات التواصل'],
      '4': ['السياحة البيئية', 'الحفاظ على البيئة', 'السياحة المجتمعية']
    };
    return features[deptId] || [];
  }
}