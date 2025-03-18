import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [
    CommonModule
  ],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  countdown: number = 5 * 60 * 1000; // 5 minutes in milliseconds
  interval: any; // Timer reference
  countdownInterval: any;
  showSpinner: boolean = false;

  constructor(private http: HttpClient, private router: Router){}

  isVisible: { [key: string]: boolean } = {}; // Track visibility for multiple sections

  toggleDetails(id: string) {
    let details = document.getElementById(id);
    if (details) {
      if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        console.log("Hello");
      } else {
        details.style.display = "none";
        console.log("Hello");
      }
    } else {
      console.error(`Element with ID '${id}' not found.`);
    }
  }

  async generateQuiz() {
    const apiUrl = `http://127.0.0.1:5000/api/generate-quiz`;
    this.showSpinner = true;
  
    // Start countdown timer
    this.startCountdown();
  
    // Create an API request with timeout
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request Timeout")), 5 * 60 * 1000) // 5 minutes
    );
  
    // Make the API call with a timeout
    try {
      const response = await Promise.race([
        this.http.get<any>(apiUrl).toPromise(),
        timeout,
      ]);
      
      if (response && response.error) {
        throw new Error(response.error);
      }
  
      this.router.navigate(['/quiz'], {queryParams: {isgenerated: true}});
      console.log("Visited successfully", response);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    } finally {
      this.showSpinner = false;
      this.stopCountdown();
      this.router.navigate(['/quiz'], {queryParams: {isgenerated: false}});
    }
  }

  startCountdown() {
    this.countdown = 5 * 60 * 1000; // Reset to 5 minutes
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown -= 1000; // Reduce time by 1 second (1000ms)
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }
  
// Function to stop the countdown timer
  stopCountdown() {
    clearInterval(this.interval);
    this.countdown = 0; // Ensure it displays 00:00
  }
}
