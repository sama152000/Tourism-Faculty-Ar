import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitsService } from '../../Services/units.service';
import { Unit, UnitsTabsData } from '../../model/unit.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe'; // ✅ استدعاء الـ Pipe

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
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
    // ✅ قراءة الـ slug من الـ route
    const initialSlug = this.route.snapshot.paramMap.get('slug');
    
    this.unitsService.getUnitsTabsData().subscribe(data => {
      this.unitData = data;

      // ✅ تعيين التاب المختار بناءً على الـ slug أو أول وحدة
      if (initialSlug) {
        this.selectedTab = initialSlug;
      } else if (data.sections.length) {
        this.selectedTab = data.sections[0].slug!;
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
    this.router.navigate(['/units', slug]);
  }

  getMembersCount(unit: Unit): number {
    return unit.members?.length || 0;
  }
}
