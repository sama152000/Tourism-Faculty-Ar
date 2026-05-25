import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/Faculty-of-tourism/Pages/Home/Home.component';
import { AboutUsComponent } from './core/features/Faculty-of-tourism/Pages/about-us/about-us.component';
import { DepartmentsComponent } from './core/features/Faculty-of-tourism/Pages/departments/departments.component';
import { SectorsComponent } from './core/features/Faculty-of-tourism/Pages/sectors/sectors.component';
import { UnitsComponent } from './core/features/Faculty-of-tourism/Pages/units/units.component';
import { ServicesComponent } from './core/features/Faculty-of-tourism/Pages/services/services.component';
import { NewsListComponent } from './core/features/Faculty-of-tourism/Pages/news-list/news-list.component';
import { NewsDetailsComponent } from './core/features/Faculty-of-tourism/Pages/news-list/news-details/news-details.component';
import { ContactUsComponent } from './core/features/Faculty-of-tourism/Pages/contact-us/contact-us.component';
import { ProgramsComponent } from './core/features/Faculty-of-tourism/Pages/programs/programs.component';
import { CentersComponent } from './core/features/Faculty-of-tourism/Pages/centers/centers.component';
import { CustomPageComponent } from './core/features/Faculty-of-tourism/Pages/shared/custom-page/custom-page.component';
import { AdministrationsComponent } from './core/features/Faculty-of-tourism/Pages/administrations/administrations.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'about/:slug', component: AboutUsComponent },

  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:slug', component: DepartmentsComponent },
  { path: 'sectors', component: SectorsComponent },
  { path: 'sectors/:slug', component: SectorsComponent },
  { path: 'units', component: UnitsComponent },
    { path: 'units/:slug', component: UnitsComponent },

  { path: 'services', component: ServicesComponent },
  { path: 'services/:slug', component: ServicesComponent },
  { path: 'news-list', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'programs', component: ProgramsComponent },
    { path: 'programs/:slug', component: ProgramsComponent },
 { path: 'centers', component: CentersComponent },
  { path: 'centers/:slug', component: CentersComponent },

 { path: 'administrations', component: AdministrationsComponent },
  { path: 'administrations/:slug', component: AdministrationsComponent },

  { path: 'custom/:slug', component: CustomPageComponent },
  { path: 'custom', component: CustomPageComponent },
  { path: '**', redirectTo: '/home' }

];
