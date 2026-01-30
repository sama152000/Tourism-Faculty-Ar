import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../../../Services/header.service';
import { HeaderData } from '../../../model/header.model';
import { ContactService } from '../../../Services/contact.service';
import { Contact } from '../../../model/contact.model';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, InputTextModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData!: HeaderData;
  contactInfo!: Contact;
  isMobileMenuOpen = false;

  constructor(private headerService: HeaderService, private contactService: ContactService) {}

 ngOnInit(): void {
   this.headerService.getHeaderData().subscribe(data => {
     this.headerData = data;
   });
   this.contactService.getContacts().subscribe(data => {
     if (data.length) {
       this.contactInfo = data[0];
     }
   });
 }


  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}