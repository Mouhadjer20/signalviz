import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartsComponent } from "./Components/charts/charts.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChartsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Charts';
}
