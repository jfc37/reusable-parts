import { Injectable, Inject } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { Auth0Config, AUTH0_CONFIG } from './auth0.config';
import { ReplaySubject } from 'rxjs/ReplaySubject';

(window as any).global = window;

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  public userProfile: any;
  public userProfile$ = new ReplaySubject();
  private auth0: auth0.WebAuth;

  constructor(@Inject(AUTH0_CONFIG) config: Auth0Config, private router: Router) {
    this.auth0 = new auth0.WebAuth({
      clientID: config.clientId,
      domain: config.domain,
      responseType: 'token id_token',
      redirectUri: config.redirectUri,
      scope: 'openid profile',
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(redirectRoute: string): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate([redirectRoute]);
      } else if (err) {
        this.router.navigate([redirectRoute]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
      this.getProfile();
    });
  }

  public logout(redirectRoute: string): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.userProfile$.next(null);
    // Go back to the home route
    this.router.navigate([redirectRoute]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  private getProfile(): void {
    console.error('getProfile');
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      console.error('getProfile callback', err, profile);
      if (err) {
        throw new Error('Failed getting user info');
      }
      if (profile) {
        self.userProfile$.next(profile);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
