import { Component, OnInit } from '@angular/core';
import quizData from '../../../../public/quiz_generated.json';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  imports: [
    CommonModule
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: number[] = [];
  correctAnswers: number[] = [];
  quizes: any[] = [];
  public score: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.quizes = quizData.quiz;
    this.questions = this.quizes[this.quizes.length - 1].questions;
    this.selectedAnswers = JSON.parse(localStorage.getItem('quizResults') || '[]');
    this.correctAnswers = this.questions.map(q => q.index_correct_answer);
    this.calculateScore();
  }

  calculateScore() {
    this.score = this.selectedAnswers.filter((answer, index) => answer === this.correctAnswers[index]).length;
  }

  restartQuiz() {
    localStorage.removeItem('quizResults');
    this.router.navigate(['/quiz']);
  }
}