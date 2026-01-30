import { Injectable } from '@angular/core';
import { ImportantLinksData, QuickLink } from '../model/important-links.model';
import { SectorsService } from './sectors.service';
import { ServicesService } from './services.service';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportantLinksService {

  constructor(
    private sectorsService: SectorsService,
    private servicesService: ServicesService
  ) {}

  getImportantLinksData(): Observable<ImportantLinksData> {
    const sectors$ = this.sectorsService.getSectors();
    const services$ = this.servicesService.getServices();

    return forkJoin([sectors$, services$]).pipe(
      map(([sectors, services]) => {
        const links: QuickLink[] = [];

        // Add sectors as links
        sectors.forEach(sector => {
          links.push({
            id: `sector-${sector.id}`,
            title: sector.name,
            image: 'assets/tour1.jpg', // Default image for sectors
            url: `/sectors/${sector.slug}`
          });
        });

        // Add services as links
        services.forEach(service => {
          links.push({
            id: `service-${service.id}`,
            title: service.title,
            image: service.iconPath || 'assets/tour2.jpg', // Use iconPath or default
            url: `/services/${service.slug}`
          });
        });

        return {
          title: 'روابط وخدمات هامة',
          links: links
        };
      })
    );
  }
}