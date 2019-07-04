import { IEnvironment } from './environment.interface';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  production: false,
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

  awsFileUploadConfig: {
    getFileMetadataUrl: 'https://7a0hnav7hc.execute-api.ap-southeast-2.amazonaws.com/dev/get-file-metadata',
    getFileLinkUrl: 'https://9k9pc9wnw2.execute-api.ap-southeast-2.amazonaws.com/dev/get-file-url',
    getFileUploadUrl: 'https://rikn5i59e8.execute-api.ap-southeast-2.amazonaws.com/default/getUploadUrl',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
