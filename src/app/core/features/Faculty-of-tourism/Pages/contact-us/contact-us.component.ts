import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContentService } from '../../Services/content.service';
import { ContactInfo } from '../../model/content.model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactInfo!: ContactInfo;
  
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  showSuccessMessage = false;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contactInfo = this.contentService.getContactInfo();
  }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.resetForm(form);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 1500);
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}