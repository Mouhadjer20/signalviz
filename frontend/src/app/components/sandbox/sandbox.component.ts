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
  updateDerivativeChart() {
    if (!this.signalExpression) {
      alert('Veuillez entrer une expression de signal.');
      return;
    }
  
    // Appeler le backend Flask pour obtenir la dérivée du signal
    this.http.get(`http://127.0.0.1:5000/get_signal_derivative?equation=${encodeURIComponent(this.signalExpression)}`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération de la dérivée.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données de la dérivée
          this.chart.ref$.subscribe((chart) => {
            const data = response.time.map((t: number, index: number) => [t, response.derivative[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 1) {
              chart.series[1].setData(data);
            } else {
              chart.addSeries({
                name: 'Dérivée',
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

  updateSecondDerivativeChart() {
    if (!this.signalExpression) {
      alert('Veuillez entrer une expression de signal.');
      return;
    }
  
    // Appeler le backend Flask pour obtenir la dérivée du signal
    this.http.get(`http://127.0.0.1:5000/get_signal_second_derivative?equation=${encodeURIComponent(this.signalExpression)}`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération de la dérivée.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données de la dérivée
          this.chart.ref$.subscribe((chart) => {
            const data = response.time.map((t: number, index: number) => [t, response.derivative[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 2) {
              chart.series[2].setData(data);
            } else {
              chart.addSeries({
                name: 'Dérivée',
                data: data,
                type: 'line',
                color: 'red' // Couleur différente pour la dérivée
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

  evenFunctionChart() {
    if (!this.signalExpression) {
      alert('Veuillez entrer une expression de signal.');
      return;
    }
  
    // Appeler le backend Flask pour obtenir la dérivée du signal
    this.http.get(`http://127.0.0.1:5000/get_even_ofـsignal?equation=${encodeURIComponent(this.signalExpression)}`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération de la dérivée.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données de la dérivée
          this.chart.ref$.subscribe((chart) => {
            const data = response.time.map((t: number, index: number) => [t, response.amplitude[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 2) {
              chart.series[2].setData(data);
            } else {
              chart.addSeries({
                name: 'Even',
                data: data,
                type: 'line',
                color: 'black' // Couleur différente pour la dérivée
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

  oddFunctionChart() {
    if (!this.signalExpression) {
      alert('Veuillez entrer une expression de signal.');
      return;
    }
  
    // Appeler le backend Flask pour obtenir la dérivée du signal
    this.http.get(`http://127.0.0.1:5000/get_odd_ofـsignal?equation=${encodeURIComponent(this.signalExpression)}`)
      .subscribe(
        (response: any) => {
          if (response.error) {
            console.error('Erreur du backend:', response.error);
            alert('Erreur lors de la génération de la dérivée.');
            return;
          }
  
          // Mettre à jour le graphe avec les nouvelles données de la dérivée
          this.chart.ref$.subscribe((chart) => {
            const data = response.time.map((t: number, index: number) => [t, response.amplitude[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 2) {
              chart.series[2].setData(data);
            } else {
              chart.addSeries({
                name: 'Odd',
                data: data,
                type: 'line',
                color: 'red' // Couleur différente pour la dérivée
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
            // Phase
            let data1 = response.frequency.map((t: number, index: number) => [t, response.phase[index]]);
            
            // Vérifie si une deuxième série existe déjà, sinon ajoute-la
            if (chart.series.length > 1) {
              chart.series[1].setData(data);
            } else {
              chart.addSeries({
                name: 'Dérivée',
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
  }
}