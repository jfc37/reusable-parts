import { Component, OnInit } from '@angular/core';
import { Auth0Service } from '@reusable-parts/auth0';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public profile$: any;
  constructor(private auth: Auth0Service) {}

  public ngOnInit(): void {
    this.auth.handleAuthentication('/home');

    this.profile$ = this.auth.userProfile$;
  }
}
