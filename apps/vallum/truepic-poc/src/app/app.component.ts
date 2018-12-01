import { Component, OnInit } from '@angular/core';
import { Auth0Service } from '@reusable-parts/auth0';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public loggedInAs$: any;
  constructor(private auth: Auth0Service) {}

  public ngOnInit(): void {
    this.auth.handleAuthentication('/home');

    this.loggedInAs$ = this.auth.userProfile$.pipe(
      tap(console.error),
      map(profile => profile && profile.name),
    );
  }

  public logout(): void {
    this.auth.logout('/welcome');
  }
}
