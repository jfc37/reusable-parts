import { Injectable, Inject } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { Auth0Config, AUTH0_CONFIG } from './auth0.config';

(window as any).global = window;

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  private auth0: auth0.WebAuth;

  constructor(@Inject(AUTH0_CONFIG) config: Auth0Config, private router: Router) {
    this.auth0 = new auth0.WebAuth({
      clientID: config.clientId,
      domain: config.domain,
      responseType: 'token id_token',
      redirectUri: config.redirectUri,
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
    });
  }

  public logout(redirectRoute: string): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate([redirectRoute]);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
