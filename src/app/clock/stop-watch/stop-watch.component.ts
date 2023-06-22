import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
const ngMaterial = [MatButtonModule];
type LapInfo = {
  stringInWatch: string;
  fastest: boolean;
  slowest: boolean;
  round: number;
};
type ExtremeRecord = {
  fastest: number;
  slowest: number;
};
@Component({
  selector: 'app-stop-watch',
  standalone: true,
  imports: [CommonModule, ngMaterial],
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent {
  milliSeconds = 0;
  seconds = 0;
  minutes = 0;
  round = 1;
  startTime = 0;
  elapsedTime = 0;
  counting = false;
  stopping = false;
  stringInWatch = '00:00.00';
  lastRoundLapValue = 0;
  currentLapDifference = 0;
  LastLapDifference = 0;
  lapInfo: LapInfo[] = [];
  extremeRecord: ExtremeRecord = { fastest: 0, slowest: 0 };
  subscription: Subscription = new Subscription();
  startTimer() {
    this.startTime = Date.now() - this.elapsedTime;
    this.counting = true;
    this.stopping = false;
    const on$ = timer(0, 10);

    this.subscription = on$.subscribe(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.milliSeconds = Math.floor((this.elapsedTime % 1000) / 10);
      this.seconds = Math.floor(this.elapsedTime / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.seconds = this.seconds % 60;

      this.stringInWatch = `${
        this.minutes < 10 ? '0' + this.minutes : this.minutes
      }:${this.seconds < 10 ? '0' + this.seconds : this.seconds}.${
        this.milliSeconds.toString().length === 2
          ? this.milliSeconds
          : '0' + this.milliSeconds
      }`;
    });
  }

  lap() {
    if (this.lapInfo.length > 1) {
      //this is the operation after the second lap, here will modify the 
      //fastest and slowest record. UI's record color will be 
      //changed if modifiy happens.
      this.currentLapDifference =
        this.minutes * 60 +
        this.seconds +
        Number('0.' + this.milliSeconds) -
        this.lastRoundLapValue;
      if (this.currentLapDifference < this.extremeRecord.fastest) {
        for (let i = 0; i < this.lapInfo.length; i++) {
          if (this.lapInfo[i].fastest === true) {
            this.lapInfo[i].fastest = false;
            this.lapInfo.unshift({
              stringInWatch: this.stringInWatch,
              fastest: true,
              slowest: false,
              round: this.round,
            });
          }
        }
        this.extremeRecord.fastest = this.currentLapDifference;
      }
      else if (this.currentLapDifference > this.extremeRecord.slowest) {
        for (let i = 0; i < this.lapInfo.length; i++) {
          if (this.lapInfo[i].slowest === true) {
            this.lapInfo[i].slowest = false;
            this.lapInfo.unshift({
              stringInWatch: this.stringInWatch,
              fastest: false,
              slowest: true,
              round: this.round,
            });
          }
        }
        this.extremeRecord.fastest = this.currentLapDifference;
      } else{
        this.lapInfo.unshift({
          stringInWatch: this.stringInWatch,
          fastest: false,
          slowest: false,
          round: this.round,
        });
      }
      this.LastLapDifference = this.currentLapDifference;
    } else if (this.lapInfo.length === 1) {
      //this is the second lap, the fastest and slowest will be calculated here
      //therefore, the ui will begin to show the fastest and slowest color
      if (this.currentLapDifference > this.extremeRecord.fastest) {
        this.extremeRecord.slowest = this.currentLapDifference;
        this.lapInfo[0].slowest = true;
        this.lapInfo.unshift({
          stringInWatch: this.stringInWatch,
          fastest: true,
          slowest: false,
          round: this.round,
        });
      }else {
        this.extremeRecord.fastest = this.currentLapDifference;
        this.lapInfo[0].fastest = true;
        this.lapInfo.unshift({
          stringInWatch: this.stringInWatch,
          fastest: false,
          slowest: true,
          round: this.round,
        });
      }
      this.LastLapDifference = this.currentLapDifference
    } else {
      //this is the first lap, no any comparasion here
      this.LastLapDifference =
        this.minutes * 60 +
        this.seconds +
        Number('0.' + this.milliSeconds) -
        this.lastRoundLapValue;
      this.extremeRecord.fastest = this.LastLapDifference;
      this.extremeRecord.slowest = this.LastLapDifference;

      this.lapInfo.unshift({
        stringInWatch: this.stringInWatch,
        fastest: false,
        slowest: false,
        round: this.round,
      });
    }

    console.log(this.lapInfo,this.extremeRecord);

    this.lastRoundLapValue =
      this.minutes * 60 + this.seconds + Number('0.' + this.milliSeconds);

    this.round++;
  }

  stopTimer() {
    this.stopping = true;
    this.counting = false;
    this.subscription.unsubscribe();
  }

  resetTimer() {
    this.counting = false;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.round = 1;
    this.stopping = false;
    this.lastRoundLapValue = 0;
    this.currentLapDifference = 0;
    this.LastLapDifference = 0;
    this.lapInfo = [];
    this.extremeRecord = { fastest: 0, slowest: 0 };
    this.stringInWatch = '00:00.00';
  }
}
