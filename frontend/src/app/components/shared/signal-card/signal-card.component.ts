import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {MatCardModule} from '@angular/material/card';
import { SignalGraphComponent } from '../signal-graph/signal-graph.component';
import { Signal } from '../../../models/signal/signal.module';

@Component({
  selector: 'app-signal-card',
  imports: [
    MatCardModule,
    SignalGraphComponent,
],
  templateUrl: './signal-card.component.html',
  styleUrls: ['./signal-card.component.css']
})
export class SignalCardComponent implements OnInit {

  @Input() signalData!: Signal;

  constructor() {}

  ngOnInit() {
    if (!this.signalData) {
      console.warn('No signal data provided!');
    } else {
      console.log('Signal Data:', this.signalData);
    }
  }
}

