import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fourier',
  imports: [
    ChartModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './fourier.component.html',
  styleUrl: './fourier.component.css'
})
export class FourierComponent {
  chart!: Chart; // Référence au graphe Highcharts
  chart_phase!: Chart; // Référence au graphe Highcharts de phase
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

    this.chart_phase = new Chart({
      chart: {
        type: 'line',
        zooming: {
          type: 'xy'
        }
      },
      title: {
        text: 'Phase of TF',
      },
      xAxis: {
        title: {
          text: 'Frequency (f)',
        },
      },
      yAxis: {
        title: {
          text: 'arg(X(f))[rad]',
        },
      },
      tooltip: {
        valueDecimals: 2,
      },
      series: [
        {
          name: 'Phase',
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
    this.clearChart()
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

  fourierTransformChart() {
    if (!this.signalExpression) {
      alert('Veuillez entrer une expression de signal.');
      return;
    }
  
    // Appeler le backend Flask pour obtenir la dérivée du signal
    this.http.get(`http://127.0.0.1:5000/get_fourier_transform?equation=${encodeURIComponent(this.signalExpression)}`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération de la dérivée.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données de la dérivée
          this.chart.ref$.subscribe((chart) => {
            // Module data
            let data = response.frequency.map((t: number, index: number) => [t, response.magnitude[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 1) {
              chart.series[1].setData(data);
            } else {
              chart.addSeries({
                name: 'Module of TF',
                data: data,
                type: 'line',
                color: 'green' // Couleur différente pour la dérivée
              });
            }
          });

          this.chart_phase.ref$.subscribe((chart) => {
            // Phase
            let data1 = response.frequency.map((t: number, index: number) => [t, response.phase[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 1) {
              chart.series[1].setData(data1);
            } else {
              chart.addSeries({
                name: 'Phase of TF',
                data: data1,
                type: 'line',
                color: 'yellow' // Couleur différente pour la dérivée
              });
            }
          });
        },
        (error) => {
          console.error('Erreur HTTP:', error);
          alert('Erreur lors de la communication avec le backend.');
        }
      );
  }

  fourierSerieChart() {

    // Appeler le backend Flask pour obtenir la dérivée du signal
    this.http.get(`http://127.0.0.1:5000/get_fourier_series?equation=rect(t/np.pi)`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération de la dérivée.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données de la dérivée
          this.chart.ref$.subscribe((chart) => {
            // Module data
            let data = response.period.map((t: number, index: number) => [t, response.a_n[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 1) {
              chart.series[1].setData(data);
            } else {
              chart.addSeries({
                name: 'Module of TF',
                data: data,
                type: 'line',
                color: 'green' // Couleur différente pour la dérivée
              });
            }
          });
        },
        (error) => {
          console.error('Erreur HTTP:', error);
          alert('Erreur lors de la communication avec le backend.');
        }
      );
  }

  clearChart() {
    this.chart.ref$.subscribe((chart) => {
      // Effacer les séries du graphique
      chart.series.forEach(series => series.setData([])); 
    });

    this.chart_phase.ref$.subscribe((chart) => {
      // Effacer les séries du graphique
      chart.series.forEach(series => series.setData([])); 
    });
  }
}
