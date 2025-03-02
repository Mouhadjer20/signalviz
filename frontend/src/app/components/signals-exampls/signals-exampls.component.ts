import { Component, OnInit } from '@angular/core';
import { SignalCardComponent } from '../shared/signal-card/signal-card.component';
import { HttpClient } from '@angular/common/http';
import { Signal } from '../../models/signal/signal.module';

@Component({
  selector: 'app-signals-exampls',
  imports: [
    SignalCardComponent
  ],
  templateUrl: './signals-exampls.component.html',
  styleUrl: './signals-exampls.component.css'
})

export class SignalsExamplsComponent implements OnInit{
  signals: Signal[] = [];
  res: Signal[] = [];
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.fetchSignalData();
  }

  fetchSignalData() {
    const apiUrl = `http://127.0.0.1:5000/api/get-signal-data`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.error) {
          console.error('API Error:', response.error);
          return;
        }
        response.forEach( (signal : Signal) => {
          this.signals.push(signal);
        });
      },
      (error) => {
        console.error(`Failed to fetch signal data:`, error);
      }
    );
  }
}