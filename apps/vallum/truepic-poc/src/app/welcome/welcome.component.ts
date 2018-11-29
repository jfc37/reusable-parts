import { Component } from '@angular/core';
import { Auth0Service } from '@reusable-parts/auth0';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private auth0: Auth0Service) {}

  public login(): void {
    this.auth0.login();
  }
}
