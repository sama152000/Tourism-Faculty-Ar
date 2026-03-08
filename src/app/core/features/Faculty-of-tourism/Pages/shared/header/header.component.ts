import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderService } from '../../../Services/header.service';
import { HeaderData, MenuItem } from '../../../model/header.model';
import { ContactService } from '../../../Services/contact.service';
import { Contact } from '../../../model/contact.model';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, InputTextModule, ButtonModule],
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData!: HeaderData;
  contactInfo!: Contact;
  isMobileMenuOpen = false;

  constructor(
    private headerService: HeaderService,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ جلب بيانات الهيدر (منيو + لوجو + روابط سوشيال)
    this.headerService.getHeaderData().subscribe(data => {
      this.headerData = data;
    });

    // ✅ جلب بيانات التواصل
    this.contactService.getContacts().subscribe(data => {
      if (data.length) {
        this.contactInfo = data[0];
      }
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // ✅ دالة مساعدة للتنقل باستخدام الـ slug من الـ backend
  navigate(item: MenuItem): void {
    if (item.routerLink) {
      // تحويل الـ routerLink إلى string إذا كان array
      const link = Array.isArray(item.routerLink) 
        ? item.routerLink.join('/') 
        : item.routerLink;
      // استخدام Angular Router للتنقل
      this.router.navigate([link]);
    } else if (item.url) {
      // لو فيه رابط خارجي
      window.open(item.url, '_blank');
    }
  }
}
