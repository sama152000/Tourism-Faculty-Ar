import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from '../../Services/programs.service';
import { ProgramsTabsData, Program } from '../../model/program.model';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  programData!: ProgramsTabsData;
  selectedTab: string = '';

  constructor(
    private programsService: ProgramsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.programsService.getProgramsTabsData().subscribe(data => {
      this.programData = data;
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

  getFacultyCount(program: Program): number {
    return program.members?.length || 0;
  }
}
