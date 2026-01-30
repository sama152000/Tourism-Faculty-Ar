import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import { Service, ServicesTabsData } from '../../model/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceData!: ServicesTabsData;
  selectedTab: string = '';

  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicesService.getServicesTabsData().subscribe(data => {
      this.serviceData = data;
      if (data.sections.length) {
        // ✅ أول خدمة افتراضية بالـ slug بدل id
        this.selectedTab = data.sections[0].slug!;
      }

      this.route.queryParams.subscribe(params => {
        if (params['tab']) {
          this.selectedTab = params['tab'];
        }
      });
    });
  }

  // ✅ onTabChange بالـ slug
  onTabChange(slug: string): void {
    this.selectedTab = slug;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: this.selectedTab },
      queryParamsHandling: 'merge'
    });
  }
}
