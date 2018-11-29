import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,

  auth0: {
    clientId: '9hW9Hc2RJqT2RL1QWyI-IUvuTeayrYS2',
    domain: 'jfc37.au.auth0.com',
    redirectUri: 'http://localhost:4200/callback',
    unauthorisedRoute: 'welcome',
  },
};
