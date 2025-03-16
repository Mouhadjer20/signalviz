import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sandbox',
  standalone: true, // Indique que le composant est autonome
  imports: [
    ChartModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
  chart!: Chart; // Référence au graphe Highcharts
  signalExpression: string = ''; // Expression du signal saisie par l'utilisateur

  constructor(private http: HttpClient) {
    this.initChart(); // Initialiser le graphe au moment de la création du composant
  }

  ngOnInit(): void {}

  // Initialiser le graphe
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
          name: 'Signal',
          type: 'line',
          data: [], // Données initiales vides
          marker: { enabled: false },
        },
      ],
      legend: {
        enabled: false,
      },
      credits: { enabled: false },
    });
  }

  // Mettre à jour le graphe en fonction de l'expression saisie
  updateChart() {
    if (!this.signalExpression) {
      alert('Veuillez entrer une expression de signal.');
      return;
    }
  
    // Appeler le backend Flask pour obtenir les données du signal
    this.http.get(`http://127.0.0.1:5000/get_signal?equation=${encodeURIComponent(this.signalExpression)}`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération du signal.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données
          this.chart.ref$.subscribe((chart) => {
            const data = response.time.map((t: number, index: number) => [t, response.amplitude[index]]);
            chart.series[0].setData(data);
          });
        },
        (error) => {
          console.error('Erreur HTTP:', error);
          alert('Erreur lors de la communication avec le backend.');
        }
      );
  }
}