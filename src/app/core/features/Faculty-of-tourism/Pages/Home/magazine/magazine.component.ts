import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazineService } from '../../../Services/magazine.service';
import { MagazineData, Journal } from '../../../model/magazine.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-magazine',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {
  magazineData!: MagazineData;
  selectedJournal!: Journal;

  constructor(private magazineService: MagazineService) {}

  ngOnInit(): void {
    this.magazineService.getMagazineData().subscribe(data => {
      this.magazineData = data;
      if (data.journals.length) {
        this.selectedJournal = data.journals[0]; // عرض أول مجلة
      }
    });
  }
}
