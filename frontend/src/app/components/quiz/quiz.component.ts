// quiz.component.ts
import { Component, OnInit } from '@angular/core';
import quizData from '../../../../public/quiz_generated.json';
import { ActivatedRoute, Router } from '@angular/router';
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
  isGenerated: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isGenerated = params['isgenerated'] === 'true';
    });

    this.quizes = quizData.quiz;
    if(this.isGenerated){
      this.questions = this.quizes[this.quizes.length - 1].questions;
      console.log(this.isGenerated)
    }
    else{
      const randomIdx = Math.floor(Math.random() * this.quizes.length)
      this.questions = this.quizes[randomIdx].questions;
      console.log(this.isGenerated)
      console.log(randomIdx)
    }
    
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