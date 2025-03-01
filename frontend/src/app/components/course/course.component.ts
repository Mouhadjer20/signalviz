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
export class CourseComponent{
  signalData = {
    time: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
    amplitude: [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
  };
}