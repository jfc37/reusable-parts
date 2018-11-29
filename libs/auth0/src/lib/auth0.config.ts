/**
 * Config required to be provided by consuming application
 */
export interface Auth0Config {
  clientId: string;
  domain: string;
  redirectUri: string;
}

export const AUTH0_CONFIG = 'AUTH0_CONFIG';
