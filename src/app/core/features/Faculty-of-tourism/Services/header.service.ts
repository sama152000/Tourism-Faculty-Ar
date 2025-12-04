import { Injectable, Inject } from '@angular/core';
import { HeaderData } from '../model/header.model';
import { AboutTabsService } from './about-tabs.service';
import { DepartmentTabsService } from './department-tabs.service';
import { SectorsService } from './sectors.service';
import { ServicesService } from './services.service';
import { UnitsService } from './units.service';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private aboutTabsService: AboutTabsService,
    private departmentTabsService: DepartmentTabsService,
    private sectorsService: SectorsService,
    @Inject(ServicesService)
    private servicesService: ServicesService,
    private unitsService: UnitsService,
    private contentService: ContentService
  ) {}

  getHeaderData(): HeaderData {
    const aboutSections = this.aboutTabsService.getAboutSections();
    const departments = this.departmentTabsService.getDepartments();
    const sectors = this.sectorsService.getSectors();
    const services = this.servicesService.getServices();
    const units = this.unitsService.getUnits();
    const contentCategories = this.contentService.getContentCategories();

    return {
      logo: './assets/tour-logo.jpg',
      title: 'كلية السياحة والفنادق',
      searchPlaceholder: 'ابحث...',
      languageButton: 'English',
      socialLinks: [
        { id: '1', platform: 'Facebook', url: '#', icon: 'pi pi-facebook' },
        { id: '2', platform: 'Twitter', url: '#', icon: 'pi pi-twitter' },
        { id: '3', platform: 'Instagram', url: '#', icon: 'pi pi-instagram' }
      ],
      navigationItems: [
        { 
          id: '1', 
          label: 'الرئيسية', 
          routerLink: '/' 
        },
        {
          id: '2',
          label: 'عن الكلية',
          routerLink: '/about',
          items: aboutSections.map(section => ({
            id: `2-${section.id}`,
            label: section.title,
            routerLink: '/about',
            queryParams: { tab: section.id }
          }))
        },
        {
          id: '3',
          label: 'الأقسام العلمية',
          routerLink: '/departments',
          items: departments.map(dept => ({
            id: `3-${dept.id}`,
            label: dept.name,
            routerLink: '/departments',
            queryParams: { tab: dept.id }
          }))
        },
        {
          id: '4',
          label: 'الأخبار والفعاليات',
          routerLink: '/news-list',
          items: contentCategories.map(category => ({
            id: `4-${category.id}`,
            label: category.label,
            routerLink: '/news-list',
            queryParams: { category: category.id }
          }))
        },
        {
          id: '5',
          label: 'القطاعات',
          routerLink: '/sectors',
          items: sectors.map(sector => ({
            id: `5-${sector.id}`,
            label: sector.name,
            routerLink: '/sectors',
            queryParams: { tab: sector.id }
          }))
        },
        {
          id: '7',
          label: 'الخدمات',
          routerLink: '/services',
          items: services.map(service => ({
            id: `7-${service.id}`,
            label: service.name,
            routerLink: '/services',
            queryParams: { tab: service.id }
          }))
        },
        {
          id: '8',
          label: 'الوحدات',
          routerLink: '/units',
          items: units.map(unit => ({
            id: `8-${unit.id}`,
            label: unit.name,
            routerLink: '/units',
            queryParams: { tab: unit.id }
          }))
        },
        { id: '9', label: 'اتصل بنا', routerLink: '/contact' }
      ]
    };
  }
}