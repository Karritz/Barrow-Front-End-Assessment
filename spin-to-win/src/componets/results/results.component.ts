import { Component, OnInit } from '@angular/core';
import { WheelValues } from '../spinning-wheel-game/interfaces/wheelValue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  result: WheelValues | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let sessionString = sessionStorage.getItem('spinResult')
    if (sessionString) {
      this.result = JSON.parse(sessionString);
    }
  }

  navigateHome() {
    this.router.navigate(['/welcome'])
  }

}
