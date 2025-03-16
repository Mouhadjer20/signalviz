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
export class SignalsExamplsComponent implements OnInit {
  signals: Signal[] = []; // Array to store signal data
  selectedCardIndex: number | null = null; // Track the expanded card index

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSignalData(); // Fetch signal data on component initialization
  }

  // Fetch signal data from the API
  fetchSignalData() {
    const apiUrl = `http://127.0.0.1:5000/api/get-signal-data`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.error) {
          console.error('API Error:', response.error);
          return;
        }
        // Add each signal to the signals array
        response.forEach((signal: Signal) => {
          this.signals.push(signal);
        });
      },
      (error) => {
        console.error(`Failed to fetch signal data:`, error);
      }
    );
  }

  // Toggle card expansion
  toggleCard(index: number) {
    if (this.selectedCardIndex === index) {
      // If the same card is clicked again, collapse it
      this.selectedCardIndex = null;
    } else {
      // Expand the clicked card
      this.selectedCardIndex = index;
    }
  }
}