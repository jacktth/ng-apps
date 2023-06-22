import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TimeComponent],
})
export class HomeComponent {

}
