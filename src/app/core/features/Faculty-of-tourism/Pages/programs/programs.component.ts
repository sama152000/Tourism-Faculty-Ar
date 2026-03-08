import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from '../../Services/programs.service';
import { ProgramsTabsData, Program } from '../../model/program.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe'; // ✅ استدعاء الـ Pipe

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
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
    // ✅ قراءة الـ slug من الـ route
    const initialSlug = this.route.snapshot.paramMap.get('slug');
    
    this.programsService.getProgramsTabsData().subscribe(data => {
      this.programData = data;

      // ✅ تعيين التاب المختار بناءً على الـ slug أو أول برنامج
      if (initialSlug) {
        this.selectedTab = initialSlug;
      } else if (data.sections.length) {
        this.selectedTab = data.sections[0].slug;
      }

      // ✅ متابعة أي تغيير في الـ route params
      this.route.params.subscribe(params => {
        if (params['slug'] && params['slug'] !== this.selectedTab) {
          this.selectedTab = params['slug'];
        }
      });
    });
  }

  // ✅ التنقل باستخدام الـ slug من الـ backend
  onTabChange(slug: string): void {
    this.selectedTab = slug;
    this.router.navigate(['/programs', slug]);
  }

  getFacultyCount(program: Program): number {
    return program.members?.length || 0;
  }
}
