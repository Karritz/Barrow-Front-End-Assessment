import { Component, OnInit } from '@angular/core';
import { WheelValues } from './interfaces/wheelValue';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinning-wheel-game',
  imports: [CommonModule],
  templateUrl: './spinning-wheel-game.component.html',
  styleUrl: './spinning-wheel-game.component.css'
})
export class SpinningWheelGameComponent implements OnInit {

  wheelValues: WheelValues[] = [
    {
      label: "segment 0",
      color: "red",
      rotation: 0,
    },
    {
      label: "segment 1",
      color: "blue",
      rotation: 0,
    },{
      label: "segment 2",
      color: "yellow",
      rotation: 0,
    },
    {
      label: "segment 3",
      color: "pink",
      rotation: 0,
    },
    {
      label: "segment 4",
      color: "purple",
      rotation: 0,
    }
  ];

  segmentSlice = 360 / this.wheelValues.length;
  segmentOffset = 0;
  
  wheelStyle!:string;
  wheelSegments:string = '';

  loading: boolean= false;

  ngOnInit(): void {
    for (let i = 0; i < this.wheelValues.length; i++) {
      this.wheelValues[i].rotation =this.segmentOffset - ((this.segmentSlice * i) * - 1);  
      this.wheelSegments = this.wheelSegments + `${this.wheelValues[i].color} ${this.wheelValues[i].rotation}deg ${this.wheelValues[i].rotation + this.segmentSlice}deg,`
    }
    this.wheelSegments = this.wheelSegments.slice(0, -1);
    this.wheelStyle = `background: conic-gradient(${this.wheelSegments});`;
    this.loading = true;
    console.log(this.wheelStyle)
  }

}
