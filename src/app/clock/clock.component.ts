import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CounterComponent } from './counter/counter.component';
import { MatTabsModule } from '@angular/material/tabs';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import { ClockFaceComponent } from './clock-face/clock-face.component';
const ngMaterial = [MatTabsModule];

const component = [StopWatchComponent, CounterComponent,ClockFaceComponent];
@Component({
  selector: 'app-clock',
  standalone: true,
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NgCircleProgressModule,
    ngMaterial,
    component,
  ],
})
export class ClockComponent {
  //input value
  hour = 0;
  minute = 0;
  second = 50;
  totalTime = 0;
  remainingTime = 0;
  //percent is for the counter to display circle pregress animation
  percent = 100;
  //string is to show the time in the counter
  string = `${this.hour < 10 ? '0' + this.hour : this.hour}:${
    this.minute < 10 ? '0' + this.minute : this.minute
  }:${this.second > 9 ? this.second : '0' + this.second}`;

  //remember the last input value
  orignalSecond = 0;
  orignalMinute = 0;
  orignalHour = 0;

  subscription: Subscription = new Subscription();
  counting = false;

  inputTime(timeframe: string, event: Event) {
    const number = Number((event.target as HTMLInputElement).value);
    const valueLength = (event.target as HTMLInputElement).value.length;
    console.log(
      number,
      'lll',
      valueLength,
      'html',
      (event.target as HTMLInputElement).value
    );
    function adjustZero(value: string) {
      if (value.slice(0, 1) === '0' && value.length <= 2) {
        return value.slice(1);
      } else if (value.length >= 3) {
        return value.slice(1, 3);
      } else {
        return value;
      }
    }
    const adjustedValue = adjustZero((event.target as HTMLInputElement).value);

    switch (true) {
      case timeframe === 'hour':
        Number(adjustedValue) >= 25
          ? (this.hour = 24)
          : (this.hour = Number(adjustedValue));
        console.log('hour', this.hour);

        break;
      case timeframe === 'minute':
        Number(adjustedValue) >= 60
          ? (this.minute = 59)
          : (this.minute = Number(adjustedValue));
        break;
      case timeframe === 'second':
        Number(adjustedValue) >= 60
          ? (this.second = 59)
          : (this.second = Number(adjustedValue));
        break;

      default:
        break;
    }
  }
  startCount() {
    if (this.totalTime === 0) {
      //prevent stopCounting to re-calculate the total time
      this.totalTime = this.hour * 60 * 60 + this.minute * 60 + this.second;
    }
    this.orignalSecond = this.second;
    this.orignalMinute = this.minute;
    this.orignalHour = this.hour;
    this.counting = true;

    const on$ = timer(0, 1000);
    this.subscription = on$.subscribe(() => {
      if (this.second === 0 && this.minute === 0 && this.hour === 0) {
        this.stopCount();
      } else if (this.second === 0 && this.minute === 0 && this.hour > 0) {
        this.second = 59;
        this.minute = 59;
        this.hour--;
      } else if (this.second === 0 && this.minute > 0) {
        this.second = 59;
        this.minute--;
      } else {
        this.second--;
      }
      this.remainingTime = this.hour * 60 * 60 + this.minute * 60 + this.second;
      this.percent = (this.remainingTime / this.totalTime) * 100;
      this.string = `${this.hour < 10 ? '0' + this.hour : this.hour}:${
        this.minute < 10 ? '0' + this.minute : this.minute
      }:${this.second > 9 ? this.second : '0' + this.second}`;
      console.log(
        'totalTime',
        this.totalTime,
        'remainingTime',
        this.remainingTime,
        this.percent
      );
    });
  }
  stopCount() {
    this.counting = false;

    this.subscription.unsubscribe();
  }
  cancelCount() {
    //while counting, this can be called to cancel the counting
    this.subscription.unsubscribe();
    this.counting = false;
    this.second = this.orignalSecond;
    this.minute = this.orignalMinute;
    this.hour = this.orignalHour;
  }
}
