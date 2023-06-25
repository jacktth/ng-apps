import { Component } from '@angular/core';

@Component({
  selector: 'app-clock-face',
  templateUrl: './clock-face.component.html',
  styleUrls: ['./clock-face.component.scss'],
  standalone: true,
})
export class ClockFaceComponent {
  currentTime: Date = new Date();
  hourAngle: number = (this.currentTime.getHours() % 12) * 30 + this.currentTime.getMinutes() / 2;
  minuteAngle: number= this.currentTime.getMinutes() * 6;
  secondAngle: number= this.currentTime.getSeconds() * 6;
  radius: number = 100;
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
