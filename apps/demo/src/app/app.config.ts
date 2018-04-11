import { LoginPageConfig } from "../../../../lib-config/login-page.config";
import { RegisterPageConfig } from "../../../../lib-config/register-page.config";

/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/main/content/pages/authentication/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */
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

export const loginPageConfig = {
  name: `Bob Barber's Resource Consent Shop`,
  description: `One place shop for resource consents`,
  afterLoginRoute: 'dashboard',
  registerRoute: 'register',
} as LoginPageConfig;

export const registerPageConfig = {
  name: `Bob Barber's Resource Consent Shop`,
  description: `One place shop for resource consents`,
  loginRoute: 'login',
} as RegisterPageConfig;