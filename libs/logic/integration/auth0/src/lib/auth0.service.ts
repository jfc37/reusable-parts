import { Injectable, Inject } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Auth0Config, AUTH0_CONFIG } from './auth0.config';

@Injectable()
export class Auth0Service {
  private auth0: auth0.WebAuth;

  constructor(@Inject(AUTH0_CONFIG) private config: Auth0Config) {
    this.auth0 = new auth0.WebAuth({
      clientID: config.clientId,
      domain: config.domain,
      responseType: 'token id_token',
      redirectUri: config.redirectUri,
      scope: 'openid profile app_metadata',
    });
  }
  public login(loginAttempt: LoginAttempt): void {
    this.auth0.login(
      { email: loginAttempt.email, password: loginAttempt.password },
      console.error.bind(null, 'xxx login result'),
    );
  }
}

export interface LoginAttempt {
  email: string;
  password: string;
  rememberMe: boolean;
}
