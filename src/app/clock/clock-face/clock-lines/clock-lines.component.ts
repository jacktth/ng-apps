import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clock-lines',
  templateUrl: './clock-lines.component.html',
  styleUrls: ['./clock-lines.component.scss'],
})
export class ClockLinesComponent {
  @Input()
  numberOfLines!: number;
  
  array = new Array(this.numberOfLines)
}
