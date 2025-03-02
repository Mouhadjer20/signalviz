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
  @Input() signalData: { equation: string; time: number[]; amplitude: number[]; energie: number; } | undefined; // Input from parent component
  chart: Chart | undefined; // Change to `undefined` instead of `null`

  constructor(private http: HttpClient) {} // Inject HttpClient here

  ngOnInit() {
    if (this.signalData) {
      this.createChart(this.signalData.equation, this.signalData.time, this.signalData.amplitude, this.signalData.energie);
    } else {
      this.fetchSignalData();
    }
  }

  fetchSignalData() {
    const apiUrl = 'http://127.0.0.1:5000/api/get-signal-data'; // Backend URL

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.createChart(response.equation, response.time, response.amplitude, response.energie);
      },
      (error) => {
        console.error('Failed to fetch signal data:', error);
      }
    );
  }

  createChart(equation: string, time: number[], amplitude: number[], energie: number) {
    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: equation,
      },
      xAxis: {
        title: {
          text: 'Time (t)',
        },
        categories: time.map(String), // Convert time values to strings for categories
      },
      yAxis: {
        title: {
          text: 'Amplitude',
        },
      },
      series: [
        {
          name: 'Signal',
          data: amplitude,
          type: 'line',
        },
      ],
      tooltip: {
        valueDecimals: 2,
      },
      credits: {
        enabled: false, // Disable the Highcharts watermark
      },
    });
  }
}