import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ContactService } from '../../Services/contact.service';
import { Contact } from '../../model/contact.model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactInfo!: Contact;
  mapUrl!: SafeResourceUrl;
  facebookUrl!: SafeUrl;
  twitterUrl!: SafeUrl;
  instagramUrl!: SafeUrl;

  constructor(private contactService: ContactService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      if (data.length) {
        this.contactInfo = data[0]; // أول عنصر من الـ API
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contactInfo.mapLocation);
        this.facebookUrl = this.sanitizer.bypassSecurityTrustUrl(this.contactInfo.facebook);
        this.twitterUrl = this.sanitizer.bypassSecurityTrustUrl(this.contactInfo.twitter);
        this.instagramUrl = this.sanitizer.bypassSecurityTrustUrl(this.contactInfo.instagram);
      }
    });
  }
}
