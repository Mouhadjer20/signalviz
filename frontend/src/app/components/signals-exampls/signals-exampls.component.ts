import { Component } from '@angular/core';
import { SignalCardComponent } from '../shared/signal-card/signal-card.component';

@Component({
  selector: 'app-signals-exampls',
  imports: [SignalCardComponent],
  templateUrl: './signals-exampls.component.html',
  styleUrl: './signals-exampls.component.css'
})
export class SignalsExamplsComponent {

}

/*  @Input() signalName: string = 'x1'; // Default signal if not provided
  @Input() signalData?: { equation: string; time: number[]; amplitude: number[]; energie: number; };
  chart?: Chart;
  @Input() timeData: string[] = [];
  @Input() amplitueData: number[] = [];

  constructor(private http: HttpClient) {
}

  ngOnInit() {
    this.createChart();
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
  }*/