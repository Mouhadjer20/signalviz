import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-basics',
  imports: [
    ChartModule,
    FormsModule
  ],
  templateUrl: './basics.component.html',
  styleUrl: './basics.component.css'
})

export class BasicsComponent implements OnInit {
  chart!: Chart;
  amplitude: number = 1;
  center: number = 0;
  timeRange: number = 5;

  constructor() {
    this.chart = new Chart({
      chart: {
        type: 'line',
        zooming: {
          type: 'xy'
        }
      },
      title: {
        text: 'Rectangle Function',
      },
      xAxis: {
        title: {
          text: 'Time (t)',
        },
      },
      yAxis: {
        title: {
          text: 'Amplitude',
        },
      },
      tooltip: {
        valueDecimals: 2, // Show exact values on hover
      },
      series: [
        {
          name: 'rect(t)',
          data: this.generateRectangleData(this.amplitude, this.center, this.timeRange),
          type: 'line',
          marker: { enabled: false },
        },
      ],
      legend: {
        enabled: false,
      },
      credits: { enabled: false },
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  generateRectangleData(A: number, C: number, t: number): number[][] {
    const data: number[][] = [];
    for (let time = -t; time <= t; time += 0.1) {
      const value = Math.abs(time - C) <= 0.5 ? A : 0;
      data.push([time, value]);
    }
    return data;
  }

  updateChart() {
    this.chart.ref$.subscribe((chart) => {
      chart.series[0].setData(this.generateRectangleData(this.amplitude, this.center, this.timeRange));
    });
  }
}
