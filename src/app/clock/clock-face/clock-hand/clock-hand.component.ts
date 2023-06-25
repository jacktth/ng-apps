import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clock-hand',
  templateUrl: './clock-hand.component.svg',
  styleUrls: ['./clock-hand.component.scss'],
})
export class ClockHandComponent {
  currentTime: Date = new Date();
  hourAngle: number = 0;
  minuteAngle: number= 0;
  secondAngle: number= 0;
  
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
      this.hourAngle = (this.currentTime.getHours() % 12) * 30 + this.currentTime.getMinutes() / 2;
      this.minuteAngle = this.currentTime.getMinutes() * 6;
      this.secondAngle = this.currentTime.getSeconds() * 6;
    }, 1000);
  }
}
