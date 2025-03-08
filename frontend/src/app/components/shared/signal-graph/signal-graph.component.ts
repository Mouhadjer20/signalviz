import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signal-graph',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './signal-graph.component.html',
  styleUrls: ['./signal-graph.component.css'],
})
export class SignalGraphComponent implements OnInit {
  chart?: Chart;
  @Input() timeData: number[] = [];
  @Input() amplitudeData: number[] = [];
  @Input() linkOfReq: string = "";
  @Input() equation: string = "";
  @Input() heightChart: number = 250;
  @Input() widthChart: number = 260;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    if(this.linkOfReq.match("examples"))
      this.createChart();
    else
      this.createChartBasics();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Destroy previous chart before creating a new one
    }

    this.chart = new Chart({
      chart: {
        type: 'line',
        height: this.heightChart,
        width: this.widthChart,
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

  async createChartBasics(){
    console.log(this.equation);
    if(this.equation.includes("="))
      this.equation = this.equation.split("=")[1].trim();
    if (this.equation !== ""){
      await this.fetchSignalData();
      this.createChart();
    }
  }

  fetchSignalData() {
    const apiUrl = `http://127.0.0.1:5000/get_signal?equation=${encodeURIComponent(this.equation)}`;

    this.http.get<any>(apiUrl).subscribe(
      (response: any) => {
        if (response.error) {
          console.error('API Error:', response.error);
          return;
        }
        this.timeData = response.time;
        this.amplitudeData = response.amplitude

        this.cdRef.detectChanges();
        this.createChart();
      },
      (error) => {
        console.error(`Failed to fetch signal data:`, error);
      }
    );
    this.timeData = [];
    this.amplitudeData = [];
  }
}