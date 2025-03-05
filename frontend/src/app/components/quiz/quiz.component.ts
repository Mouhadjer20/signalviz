import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  quizQuestion: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) {}

  generateQuizQuestion() {
    this.loading = true;
    this.error = '';

    this.apiService.generateQuizQuestion().subscribe(
      (response) => {
        console.log(response.question);
        this.quizQuestion = response.question;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to generate quiz question. Please try again.';
        this.loading = false;
        console.error(error);
      }
    );
  }
}