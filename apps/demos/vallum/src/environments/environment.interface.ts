import { Auth0Config } from '@reusable-parts/logic/integration/auth0';
import { NzBusinessApiConfig } from '@reusable-parts/logic/integration/nz-business';

export interface IEnvironment {
  production: boolean;
  auth0: Auth0Config;
  nzBusinessApi: NzBusinessApiConfig;
}
