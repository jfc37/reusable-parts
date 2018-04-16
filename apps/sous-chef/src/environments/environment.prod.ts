import { Environment } from "./environment.interface";

export const environment: Environment = {
  production: true,

  firebase: {
    apiKey: "AIzaSyCzDQBoimS6QcVJJk6eDZWasUFm_S7BlW8",
    authDomain: "sous-chef-37.firebaseapp.com",
    databaseURL: "https://sous-chef-37.firebaseio.com",
    projectId: "sous-chef-37",
    storageBucket: "sous-chef-37.appspot.com",
    messagingSenderId: "385236639538"
  },

  fuseConfig: {
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
  },

  loginPageConfig: {
    name: `Sous Chef`,
    description: `Your dinner helper`,
    afterLoginRoute: 'dashboard',
    registerRoute: 'register',
  },

  registerPageConfig:{
    name: `Sous Chef`,
    description: `Your dinner helper`,
    loginRoute: 'login',
    afterRegistrationRoute: 'dashboard',
  }

};
