import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClockComponent } from './clock/clock.component';
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  
})
export class AppComponent {

  title = 'homes';
  constructor(private router: Router) {}

  isRootRoute(): boolean {
    return this.router.url === '/';
  }
}
