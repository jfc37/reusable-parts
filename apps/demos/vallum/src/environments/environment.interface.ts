import { Auth0Config } from '@reusable-parts/logic/integration/auth0';

export interface IEnvironment {
  production: boolean;
  auth0: Auth0Config;
}
