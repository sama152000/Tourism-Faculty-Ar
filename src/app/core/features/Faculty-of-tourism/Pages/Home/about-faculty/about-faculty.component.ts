import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutFacultyService } from '../../../Services/about-faculty.service';
import { AboutFacultyData } from '../../../model/about-faculty.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-about-faculty',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './about-faculty.component.html',
  styleUrls: ['./about-faculty.component.css']
})
export class AboutFacultyComponent implements OnInit {
  aboutData!: AboutFacultyData;

  constructor(private aboutFacultyService: AboutFacultyService) {}

  ngOnInit(): void {
    this.aboutData = this.aboutFacultyService.getAboutFacultyData();
  }
}