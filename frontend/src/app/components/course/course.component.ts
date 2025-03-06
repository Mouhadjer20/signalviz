import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course',
  imports: [
    CommonModule
  ],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {

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
}
