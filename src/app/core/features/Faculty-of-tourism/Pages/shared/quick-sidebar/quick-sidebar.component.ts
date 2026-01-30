import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuickSidebarService } from '../../../Services/quick-sidebar.service';
import { QuickSidebarData } from '../../../model/quick-sidebar.model';

@Component({
  selector: 'app-quick-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quick-sidebar.component.html',
  styleUrls: ['./quick-sidebar.component.css']
})
export class QuickSidebarComponent implements OnInit {
  sidebarData!: QuickSidebarData;
  isExpanded = false;

  constructor(private quickSidebarService: QuickSidebarService) {}

  ngOnInit(): void {
    this.sidebarData = this.quickSidebarService.getQuickSidebarData();
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onMouseEnter(): void {
    this.isExpanded = true;
  }

  onMouseLeave(): void {
    this.isExpanded = false;
  }
}