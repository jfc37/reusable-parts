import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth0Service } from './auth0.service';
import { Auth0Config, AUTH0_CONFIG } from './auth0.config';

@Injectable({
  providedIn: 'root',
})
export class Auth0Guard implements CanActivate {
  constructor(@Inject(AUTH0_CONFIG) private config: Auth0Config, private auth: Auth0Service, private router: Router) {}

  public canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate([this.config.unauthorisedRoute]);
      return false;
    }
    return true;
  }
}
