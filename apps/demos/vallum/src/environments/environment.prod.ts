import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  domain: 'https://vallum.netlify.com/',

  auth0: {
    clientId: '9hW9Hc2RJqT2RL1QWyI-IUvuTeayrYS2',
    domain: 'jfc37.au.auth0.com',
    redirectUri: 'https://vallum.netlify.com/callback',
    logoutRedirectUri: 'https://vallum.netlify.com',
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
