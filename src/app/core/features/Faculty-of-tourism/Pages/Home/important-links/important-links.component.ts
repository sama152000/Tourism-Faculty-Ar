import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportantLinksService } from '../../../Services/important-links.service';
import { ImportantLinksData } from '../../../model/important-links.model';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-important-links',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './important-links.component.html',
  styleUrls: ['./important-links.component.css']
})
export class ImportantLinksComponent implements OnInit {
  linksData!: ImportantLinksData;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private importantLinksService: ImportantLinksService) {}

  ngOnInit(): void {
    this.linksData = this.importantLinksService.getImportantLinksData();
  }
}