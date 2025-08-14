import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactRequest } from '../../services/contact.service';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() showSnackbar = new EventEmitter<string>();
  
  contactForm: ContactRequest = {
    email: '',
    subject: 'suggest-track',
    message: ''
  };
  
  submitting = false;
  
  subjectOptions = [
    { value: 'suggest-track', label: 'Suggest a new track' },
    { value: 'report-issue', label: 'Report incorrect information' },
    { value: 'general-feedback', label: 'General feedback' }
  ];
  
  constructor(private contactService: ContactService) {}
  
  onSubmit(): void {
    if (!this.contactForm.email.trim() || !this.contactForm.message.trim()) {
      return;
    }
    
    this.submitting = true;
    
    this.contactService.submitContact(this.contactForm).subscribe({
      next: (response) => {
        this.submitting = false;
        this.showSnackbar.emit('Message sent successfully!');
        this.onClose();
      },
      error: (error) => {
        this.submitting = false;
        this.showSnackbar.emit('Failed to send message. Please try again.');
        console.error('Error submitting contact form:', error);
      }
    });
  }
  
  onClose(): void {
    this.closeModal.emit();
  }
} 