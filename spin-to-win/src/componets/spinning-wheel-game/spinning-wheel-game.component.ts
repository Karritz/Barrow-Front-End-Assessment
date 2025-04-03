import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WheelValues } from './interfaces/wheelValue';
import { CommonModule } from '@angular/common';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations'
import { Router } from '@angular/router';

@Component({
  selector: 'app-spinning-wheel-game',
  imports: [CommonModule],
  templateUrl: './spinning-wheel-game.component.html',
  styleUrl: './spinning-wheel-game.component.css'
})
export class SpinningWheelGameComponent implements OnInit, OnDestroy {

  @ViewChild('wheel') demoCard: ElementRef | undefined;

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
    }, {
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
  segmentOffset = Math.floor(180 / this.wheelValues.length);

  wheelStyle!: string;
  wheelSegments: string = '';

  loading: boolean = false;

  private animationPlayer: AnimationPlayer | undefined;

  constructor(private animationBuilder: AnimationBuilder, private router: Router) { 
    sessionStorage.clear()
  }
  
  ngOnDestroy(): void {
    this.animationPlayer?.destroy()
  }


  ngOnInit(): void {
    for (let i = 0; i < this.wheelValues.length; i++) {
      this.wheelValues[i].rotation = 0 - ((this.segmentSlice * i) * - 1);
      this.wheelSegments = this.wheelSegments + `${this.wheelValues[i].color} ${this.wheelValues[i].rotation}deg ${this.wheelValues[i].rotation + this.segmentSlice}deg,`
    }
    this.wheelSegments = this.wheelSegments.slice(0, -1);
    this.wheelStyle = `background: conic-gradient(${this.wheelSegments});`;
    this.loading = true;
  }

  transformSegment(value: WheelValues): any {
    let angle = 270 + this.segmentOffset + value.rotation 
    return `rotate(${angle}deg) translate(${20 / 2}em) rotate(-${angle}deg)`
  }

  playAnimation(random: boolean) {
    let index = 0
    if(random) {
      index = Math.floor(Math.random() * this.wheelValues.length);
    } 
    const player = this.getAnimationPlayer((this.segmentOffset + this.wheelValues[index].rotation));
    if (!player) {
      return
    }
    player.play();
    player.onDone(()=> {
      sessionStorage.setItem('spinResult', JSON.stringify(this.wheelValues[index]));
      if(sessionStorage.getItem('spinResult')) {
        this.router.navigate(['/result'])
      }
    });
  }


  private getAnimationPlayer(degrees: number): AnimationPlayer | undefined {
    if (!this.demoCard?.nativeElement) {
      return;
    }
      const factory = this.animationBuilder.build(
        [
          style({ transform: 'rotate(0deg)' }),
          animate('1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ transform: `rotate(${360 - degrees}deg)` })),
        ]
      );
      this.animationPlayer = factory.create(this.demoCard.nativeElement); 

    return this.animationPlayer;
  }
}
