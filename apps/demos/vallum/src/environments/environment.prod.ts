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

  awsFileUploadConfig: {
    getFileMetadataUrl: 'https://7a0hnav7hc.execute-api.ap-southeast-2.amazonaws.com/default/get-file-metadata',
    getFileLinkUrl: 'https://9k9pc9wnw2.execute-api.ap-southeast-2.amazonaws.com/dev/get-file-url',
    getFileUploadUrl: 'https://rikn5i59e8.execute-api.ap-southeast-2.amazonaws.com/default/getUploadUrl',
  },
};
