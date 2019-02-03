import { Auth0Config } from '@reusable-parts/auth0';
import { NzBusinessApiConfig } from '@reusable-parts/nz-business-api';

export interface IEnvironment {
  production: boolean;
  domain: string;
  auth0: Auth0Config;
  nzBusinessApi: NzBusinessApiConfig;
}
