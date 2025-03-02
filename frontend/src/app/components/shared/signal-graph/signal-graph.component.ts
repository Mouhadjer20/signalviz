import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartModule } from 'angular-highcharts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signal-graph',
  standalone: true,
  imports: [CommonModule, ChartModule], // Import required modules
  templateUrl: './signal-graph.component.html',
  styleUrls: ['./signal-graph.component.css'],
})
export class SignalGraphComponent implements OnInit {
  chart?: Chart;
  @Input() timeData: string[] = ['0', '1', '2', '3', '4', '5'];
  @Input() amplitudeData: number[] = [0, 1, 0.5, -0.5, -1, 0];

  constructor(private http: HttpClient) {
}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart before creating a new one
    }

    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      xAxis: {
        title: { text: 'Time (t)' },
        categories: this.timeData,
      },
      yAxis: {
        title: { text: 'Amplitude' },
      },
      series: [
        {
          name: 'Signal',
          data: this.amplitudeData,
          type: 'line',
        },
      ],
      tooltip: { valueDecimals: 2 },
      credits: { enabled: false },
    });
  }
}