import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import { Service, ServiceTabsData } from '../../model/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  serviceData!: ServiceTabsData;
  selectedTab: string = 'academic-support';

  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceData = this.servicesService.getServiceTabsData();

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