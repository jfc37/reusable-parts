import { RegisterPageConfig } from "lib-config/register-page.config";
import { LoginPageConfig } from "lib-config/login-page.config";

export interface Environment {
  production: boolean;

  firebase: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
  },

  loginPageConfig: LoginPageConfig,

  registerPageConfig: RegisterPageConfig,

  fuseConfig: {
    layout: {
      navigation: string
      navigationFolded: boolean,
      toolbar: string
      footer: string
      mode: string
    },
    colorClasses: {
      toolbar: string
      navbar: string
      footer: string
    },
    customScrollbars: boolean,
    routerAnimation: string
  }
}


export const fuseConfig = {
  layout: {
    navigation: 'left', // 'right', 'left', 'top', 'none'
    navigationFolded: false, // true, false
    toolbar: 'below', // 'above', 'below', 'none'
    footer: 'below', // 'above', 'below', 'none'
    mode: 'fullwidth' // 'boxed', 'fullwidth'
  },
  colorClasses: {
    toolbar: 'mat-white-500-bg',
    navbar: 'mat-fuse-dark-700-bg',
    footer: 'mat-fuse-dark-900-bg'
  },
  customScrollbars: true,
  routerAnimation: 'fadeIn' // fadeIn, slideUp, slideDown, slideRight, slideLeft, none
};
