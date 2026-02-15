import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./core/features/Faculty-of-tourism/Pages/shared/header/header.component";
import { QuickSidebarComponent } from "./core/features/Faculty-of-tourism/Pages/shared/quick-sidebar/quick-sidebar.component";
import { FooterComponent } from "./core/features/Faculty-of-tourism/Pages/shared/footer/footer.component";
// import { HeaderComponent } from "./core/features/Faculty-of-tourism/Pages/shared/header/header.component";
// import { FooterComponent } from "./core/features/Faculty-of-tourism/Pages/shared/footer/footer.component";
// import { QuickSidebarComponent } from "./core/features/Faculty-of-tourism/Pages/shared/quick-sidebar/quick-sidebar.component";
import { LoaderComponent } from '../app/core/features/Faculty-of-tourism/Pages/shared/loader/loader.component';


@Component({
  selector: 'app-root',
  imports: [ButtonModule, CommonModule, RouterModule, HeaderComponent, QuickSidebarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected title = 'كلية السياحه والفنادق';
  showScrollButton = false;

  isLoading = true;

  onLoadingComplete(): void {
    this.isLoading = false;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
