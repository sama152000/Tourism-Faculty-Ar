import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSliderComponent } from "./hero-slider/hero-slider.component";
import { AboutFacultyComponent } from "./about-faculty/about-faculty.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { MagazineComponent } from "./magazine/magazine.component";
import { NewsComponent } from "./news/news.component";
import { EventsComponent } from "./events/events.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ImportantLinksComponent } from "./important-links/important-links.component";

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [CommonModule, HeroSliderComponent, AboutFacultyComponent, DepartmentsComponent, MagazineComponent, NewsComponent, EventsComponent, StatisticsComponent, ImportantLinksComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
