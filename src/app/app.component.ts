import { Component } from '@angular/core';
import { TimeComponent } from './time/time.component';
import { Router } from '@angular/router';
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
