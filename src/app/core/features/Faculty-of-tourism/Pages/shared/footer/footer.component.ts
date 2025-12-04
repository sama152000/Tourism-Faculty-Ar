import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterService } from '../../../Services/footer.service';
import { FooterData } from '../../../model/footer.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerData!: FooterData;
  currentYear = new Date().getFullYear();

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerData = this.footerService.getFooterData();
  }
}