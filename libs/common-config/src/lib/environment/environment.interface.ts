import { FirebaseConfig } from '@reusable-parts/common-config/src/lib/environment/firebase.config';
import { LoginPageConfig } from '@reusable-parts/common-config/src/lib/environment/login-page.config';
import { RegisterPageConfig } from '@reusable-parts/common-config/src/lib/environment/register-page.config';
import { FuseConfig } from '@reusable-parts/common-config/src/lib/environment/fuse.config';
import { ForgotPasswordPageConfig } from '@reusable-parts/common-config/src/lib/environment/forgot-password-page.config';

export interface EnvironmentInterface {
  production: boolean;

  firebase: FirebaseConfig;

  loginPageConfig: LoginPageConfig;

  registerPageConfig: RegisterPageConfig;
  forgotPasswordPageConfig: ForgotPasswordPageConfig;

  fuseConfig: FuseConfig;
}
