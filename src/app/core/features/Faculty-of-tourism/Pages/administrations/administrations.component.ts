import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrationsService } from '../../Services/administrations.service';
import { Administration, AdministrationsTabsData } from '../../model/administration.model';
import { CleanHtmlPipe } from '../../../../pipes/clean-html.pipe';

@Component({
  selector: 'app-administrations',
  standalone: true,
  imports: [CommonModule, CleanHtmlPipe],
  templateUrl: './administrations.component.html',
  styleUrls: ['./administrations.component.css']
})
export class AdministrationsComponent implements OnInit {
  administrationData!: AdministrationsTabsData;
  selectedTab: string = '';

  constructor(
    private administrationsService: AdministrationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const initialSlug = this.route.snapshot.paramMap.get('slug');

    this.administrationsService.getAdministrationsTabsData().subscribe(data => {
      this.administrationData = data;

      if (initialSlug) {
        this.selectedTab = initialSlug;
      } else if (data.sections.length) {
        this.selectedTab = data.sections[0].slug;
      }

      this.route.params.subscribe(params => {
        if (params['slug'] && params['slug'] !== this.selectedTab) {
          this.selectedTab = params['slug'];
        }
      });
    });
  }

  onTabChange(slug: string): void {
    this.selectedTab = slug;
    this.router.navigate(['/administrations', slug]);
  }

  getMembersCount(admin: Administration): number {
    return admin.members?.length || 0;
  }
}
