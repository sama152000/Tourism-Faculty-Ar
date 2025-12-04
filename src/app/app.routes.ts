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

export const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
 { path: 'about', component: AboutUsComponent },
  { path: 'departments', redirectTo: '/departments/1', pathMatch: 'full' },
  { path: 'departments/:id', component: DepartmentsComponent },
  { path: 'sectors', component: SectorsComponent },
    { path: 'units', component: UnitsComponent },
        { path: 'services', component: ServicesComponent },
  { path: 'news-list', component: NewsListComponent },
  { path: 'news-details/:id', component: NewsDetailsComponent },
  { path: 'contact', component: ContactUsComponent },

    { path: '**', redirectTo: '/home' }

];
