import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactRequest {
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact'; // Add /api prefix

  constructor(private http: HttpClient) {}

  submitContact(request: ContactRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, request);
  }
} 