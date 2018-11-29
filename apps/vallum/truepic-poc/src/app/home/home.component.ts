import { Component } from '@angular/core';
import { Auth0Service } from '@reusable-parts/auth0';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private auth0: Auth0Service) {}

  public login(): void {
    this.auth0.login();
  }
}
