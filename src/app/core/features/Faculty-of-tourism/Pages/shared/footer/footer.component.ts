import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterService } from '../../../Services/footer.service';
import { FooterData } from '../../../model/footer.model';
import { VisitorsService } from '../../../Services/visitors.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerData: FooterData = {
    aboutText: '',
    footerSections: [],
    contactInfo: { address: '', phone: '', email: '' },
    socialLinks: [],
    copyrightText: ''
  };
  currentYear = new Date().getFullYear();
  totalViews: number | null = null;
  monthViews: number | null = null;
  todayViews: number | null = null;
  constructor(private footerService: FooterService,    private visitorsService: VisitorsService
) {
    
  }

  ngOnInit(): void {
    this.footerService.getFooterData().subscribe(data => {
      this.footerData = data;
       this.visitorsService.getTotalViews().subscribe(data => this.totalViews = data.totalViews);
    this.visitorsService.getMonthViews().subscribe(data => this.monthViews = data.monthViews);
    this.visitorsService.getTodayViews().subscribe(data => this.todayViews = data.todayViews);
    });
  }
}