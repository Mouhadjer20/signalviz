// quiz.component.ts
import { Component, OnInit } from '@angular/core';
import quizData from '../../../../public/quiz_generated.json';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignalGraphComponent } from '../shared/signal-graph/signal-graph.component';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-quiz',
  imports: [
    CommonModule,
    SignalGraphComponent,
    MatGridListModule
  ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswers: number[] = [];
  quizes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.quizes = quizData.quiz;
    console.log(this.quizes);
    this.questions = this.quizes[this.quizes.length - 1].questions;
    console.log(this.quizes[this.quizes.length - 1]);
    this.selectedAnswers = new Array(this.questions.length).fill(null);
  }

  selectAnswer(choiceIndex: number) {
    this.selectedAnswers[this.currentQuestionIndex] = choiceIndex;
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1)
      this.currentQuestionIndex++;
    else
      this.submitQuiz()
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitQuiz() {
    localStorage.setItem('quizResults', JSON.stringify(this.selectedAnswers));
    this.router.navigate(['/result']);
  }
}