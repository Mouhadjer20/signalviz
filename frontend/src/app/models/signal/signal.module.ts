import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [], // Declare components
  imports: [CommonModule], // Import necessary modules
  exports: [] // Export for use in other modules
})

export class SignalModule {
}

export class Signal {
  id: string;
  equation: string;
  amplitude: number[];
  time: number[];
  energy: number;
  derivative: string;

  constructor(id: string, equation: string, amplitude: number[], time: number[], energy: number, derivative: string = ""){
    this.id = id;
    this.equation = equation;
    this.amplitude = amplitude;
    this.time = time;
    this.energy = energy;
    this.derivative = derivative || ""; // Default value if null
  }
}
