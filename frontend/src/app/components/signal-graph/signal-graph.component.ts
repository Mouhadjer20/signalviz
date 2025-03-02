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
  @Input() signalName: string = 'x1'; // Default signal if not provided
  @Input() signalData?: { equation: string; time: number[]; amplitude: number[]; energie: number; };
  chart?: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.signalData) {
      this.createChart(this.signalData.equation, this.signalData.time, this.signalData.amplitude, this.signalData.energie);
    } else {
      this.fetchSignalData(this.signalName);
    }
  }

  fetchSignalData(signalName: string) {
    const apiUrl = `http://127.0.0.1:5000/api/get-signal-data/${signalName}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.error) {
          console.error('API Error:', response.error);
          return;
        }
        this.createChart(response.equation, response.time, response.amplitude, response.energie);
      },
      (error) => {
        console.error(`Failed to fetch signal data for ${signalName}:`, error);
      }
    );
  }

  createChart(equation: string, time: number[], amplitude: number[], energie: number) {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart before creating a new one
    }

    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: equation,
      },
      xAxis: {
        title: { text: 'Time (t)' },
        categories: time.map(String),
      },
      yAxis: {
        title: { text: 'Amplitude' },
      },
      series: [
        {
          name: 'Signal',
          data: amplitude,
          type: 'line',
        },
      ],
      tooltip: { valueDecimals: 2 },
      credits: { enabled: false },
    });
  }
}