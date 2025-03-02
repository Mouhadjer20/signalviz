import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { SignalGraphComponent } from '../signal-graph/signal-graph.component';

@Component({
  selector: 'app-signal-card',
  imports: [
    HighchartsChartModule,
    MatCardModule,
    SignalGraphComponent,
    MatButtonModule
],
  templateUrl: './signal-card.component.html',
  styleUrls: ['./signal-card.component.css']
})
export class SignalCardComponent {
  isFlipped = false;
  Highcharts = Highcharts;
  x3 = "x13";

  constructor() {}

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}

