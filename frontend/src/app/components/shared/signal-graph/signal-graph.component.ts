import { Component, Input, OnInit } from '@angular/core';
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
  @Input() timeData: number[] = [0, 1, 2, 3, 4, 5];
  @Input() amplitudeData: number[] = [0, 1, 0.5, -0.5, -1, 0];
  @Input() linkOfReq: string = "";

  constructor() {}

  ngOnInit() {
    if(this.linkOfReq.match("basics"))
      this.createChartBasics();
    else
      this.createChartExamples();
  }

  createChartExamples() {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart before creating a new one
    }

    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 250, // Set fixed height
        width: 260, // Set fixed width
      },
      title: {
        text: ''
      },
      xAxis: {
        title: { text: 'Time (t)' },
        categories: this.timeData.map(String),
        labels: {
          formatter: function () {
            return Math.round(Number(this.value)).toString(); // Show integers only
          },
        }
      },
      yAxis: {
        title: { text: 'Amplitude' },
      },
      series: [
        {
          name: '',
          data: this.amplitudeData,
          type: 'line',
        },
      ],
      legend: {
        enabled: false,
      },
      tooltip: { valueDecimals: 2 },
      credits: { enabled: false },
    });
  }

  createChartBasics(){

  }
}