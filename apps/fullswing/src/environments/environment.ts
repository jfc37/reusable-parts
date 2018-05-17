import { EnvironmentInterface, standardFuseConfig } from '@reusable-parts/common-config';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: EnvironmentInterface = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCSXYhE_CY5HdeeC3gveGn3b_ks240XVGI',
    authDomain: 'fullswing-nz.firebaseapp.com',
    databaseURL: 'https://fullswing-nz.firebaseio.com',
    projectId: 'fullswing-nz',
    storageBucket: 'fullswing-nz.appspot.com',
    messagingSenderId: '47755639760',
  },
  fuseConfig: standardFuseConfig,
  loginPageConfig: {
    name: 'Full Swing',
    afterLoginRoute: 'app',
    description: 'Dance your socks off',
    logoUrl: '/assets/fullswing.png',
    registerRoute: 'register',
    forgotPasswordRoute: 'forgot-password',
  },
  registerPageConfig: {
    afterRegistrationRoute: 'app',
    name: 'Full Swing',
    description: 'Dance your socks off',
    logoUrl: '/assets/fullswing.png',
    loginRoute: 'login',
  },
  forgotPasswordPageConfig: {
    afterResetRoute: 'login',
    name: 'Full Swing',
    description: 'Dance your socks off',
    logoUrl: '/assets/fullswing.png',
    loginRoute: 'login',
  },
};
