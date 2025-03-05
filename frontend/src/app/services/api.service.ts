import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private backendUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Method to generate a quiz question
  generateQuizQuestion(): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/generate-quiz`, {});
  }
}