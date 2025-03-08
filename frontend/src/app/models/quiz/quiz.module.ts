import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class QuizModule { 
}

export class Quiz{
  type: string;
  question: string;
  answers: Array<any>;
  indexCorrectAnswer: number;

  constructor(type: string, question: string, answers: Array<any>, indexCorrectAnswer: number) {
    this.type = type;
    this.question = question;
    this.answers = answers;
    this.indexCorrectAnswer = indexCorrectAnswer;
    
  }
}
