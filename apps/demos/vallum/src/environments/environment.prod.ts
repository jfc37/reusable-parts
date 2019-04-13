import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  domain: 'http://localhost:4200/',

  auth0: {
    clientId: '9hW9Hc2RJqT2RL1QWyI-IUvuTeayrYS2',
    domain: 'jfc37.au.auth0.com',
    redirectUri: 'http://localhost:4200/callback',
    logoutRedirectUri: 'http://localhost:4200',
    unauthorisedRoute: 'welcome',
  },

  nzBusinessApi: {
    accessToken: '37f5e6f118ae84d804f198959b29e450',
    host: 'https://sandbox.api.business.govt.nz',
  },

  copperCrm: {
    host: 'https://us-central1-vallum-truepic.cloudfunctions.net',
  },
};
