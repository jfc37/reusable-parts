import { Auth0Config } from '@reusable-parts/auth0';

export interface IEnvironment {
  production: boolean;
  auth0: Auth0Config;
}
