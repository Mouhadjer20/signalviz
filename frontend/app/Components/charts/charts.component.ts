import { Component } from '@angular/core';
import { Chart, ChartModule } from "angular-highcharts";

@Component({
  selector: 'app-charts',
  imports: [
    ChartModule
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})

export class ChartsComponent{
  
  testChart = new Chart({
    chart: { type: 'pie' },
    title: { text: 'Test Chart' },
    credits: { enabled: false },
    series: [
      {
        type: 'pie',
        data: [
          { name: '1', y: 1, color: '#eeeeee' },
          { name: '2', y: 1, color: '#e2345e' },
          { name: '3', y: 1, color: '#e344ee' },
          { name: '4', y: 1, color: '#e23a3b' },
          { name: '5', y: 1, color: '#50ab23' },
        ]
      }
    ]
  });
  
  lineChart = new Chart({
    chart: { type: 'line' },
    title: { text: 'Chart Diagram' },
    credits: { enabled: false },
    series: [
      {
        name: 'Line Chart For Test',
        data: [-10, -2, -34, 5, 2, 1, 45, 65, 3]
      } as any
    ]
  });
  
  pieChart = new Chart({
    chart: { type: 'pie', plotShadow: true },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '50%',
        borderRadius: 1,
        borderColor: '#39ee34',
        slicedOffset: 10,
        dataLabels: { connectorWidth: 0 }
      }
    },
    title: { verticalAlign: 'middle', floating: true, text: 'Test' },
    legend: { enabled: false },
    series: [
      {
        type: 'pie',
        data: [
          { name: '1', y: 1, color: '#eeeeee' },
          { name: '2', y: 1, color: '#e2345e' },
          { name: '3', y: 1, color: '#e344ee' },
          { name: '4', y: 1, color: '#e23a3b' },
          { name: '5', y: 1, color: '#50ab23' },
        ]
      }
    ]
  });
  
  signalChart = new Chart({
    chart: { type: 'line' },
    title: { text: 'Signal Chart' },
    credits: { enabled: false },
    xAxis: { 
      title: { text: 'Time (t)' },
      plotLines: [
        {
          color: 'black', // Line color
          width: 3,       // Line thickness
          value: 2,       // Position on y-axis
          dashStyle: 'solid', // Line style (solid, dash, dot, etc.)
          zIndex: 1 // Ensures it's above other chart elements
        }
      ] as any, 
      categories: ['0', '1', '2', '3', '4'] 
  },
    yAxis: { 
      title: { text: 'Amplitude' },
      plotLines: [
        {
          color: 'black', // Line color
          width: 3,       // Line thickness
          value: 0,       // Position on y-axis
          dashStyle: 'solid', // Line style (solid, dash, dot, etc.)
          zIndex: 1 // Ensures it's above other chart elements
        }
      ]
    } as any,
    series: [
      {
        type: 'line',
        name: 'Signal',
        data: [0, 1, 3, -1, 0],
      }
    ],
    plotOptions: {
      series: {
        turboThreshold: 0, // Allow large datasets
      },
    },
    tooltip: {
      valueDecimals: 2,
    }
  });  
}