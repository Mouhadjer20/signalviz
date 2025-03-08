import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class ResultModule { 
}

export class Result{
  total: number;
  correct: number;
  wrong: number;
  correctPercentage: number;
  wrongPercentage:  number;


  constructor(total: number, correct: number, wrong: number, correctPercentage: number, wrongPercentage: number){
    this.total = total;
    this.correct = correct;
    this.wrong = wrong;
    this.correctPercentage = correctPercentage;
    this.wrongPercentage = wrongPercentage;
  }
}
