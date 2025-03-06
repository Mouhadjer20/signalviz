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
  signalType: string = 'rect';

  constructor() {
    this.initChart();
  }

  ngOnInit(): void {}

  initChart() {
    this.chart = new Chart({
      chart: {
        type: 'line',
        zooming: {
          type: 'xy'
        }
      },
      title: {
        text: 'Signal Function',
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
        valueDecimals: 2,
      },
      series: [
        {
          name: this.signalType + '(t)',
          data: this.generateData(),
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

  generateData(): number[][] {
    switch (this.signalType) {
      case 'rect':
        return this.generateRectangleData(this.amplitude, this.center, this.timeRange);
      case 'tri':
        return this.generateTriangleData(this.amplitude, this.center, this.timeRange);
      case 'u':
        return this.generateUnitStepData(this.amplitude, this.center, this.timeRange);
      case 'sin':
        return this.generateSinusData(this.amplitude, this.center, this.timeRange);
      case 'delta':
        return this.generateDiracImpulse(this.amplitude, this.center, this.timeRange);
      default:
        return [];
    }
  }

  generateRectangleData(A: number, C: number, t: number): number[][] {
    const data: number[][] = [];
    for (let time = -t; time <= t; time += 0.001) {
      const value = Math.abs(time - C) <= 0.5 ? A : 0;
      data.push([time, value]);
    }
    return data;
  }

  generateTriangleData(A: number, C: number, t: number): number[][] {
    const data: number[][] = [];
    for (let time = -t; time <= t; time += 0.001) {
      const value = Math.max(0, A * (1 - Math.abs(time - C)));
      data.push([time, value]);
    }
    return data;
  }

  generateUnitStepData(A: number, C: number, t: number): number[][] {
    const data: number[][] = [];
    for (let time = -t; time <= t; time += 0.001) {
      const value = time >= C ? A : 0;
      data.push([time, value]);
    }
    return data;
  }

  generateSinusData(A: number, C: number, t: number): number[][] {
    const data: number[][] = [];
    for (let time = -t; time <= t; time += 0.001) {
      const value = A * Math.sin(2 * Math.PI * (time - C));
      data.push([time, value]);
    }
    return data;
  }

  generateDiracImpulse(A: number, C: number, t: number): number[][] {
    const data: number[][] = [];
    for (let time = -t; time <= t; time += 0.01) {
      const value = Math.abs(time - C) < 0.0000000000001 ? A : 0;
      data.push([time, value]);
    }
    return data;
  }

  updateChart() {
    this.chart.ref$.subscribe((chart) => {
      chart.series[0].setData(this.generateData());
    });
  }

  setSignalType(type: string) {
    this.signalType = type;
    this.updateChart();
  }
}
