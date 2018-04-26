import { FirebaseConfig } from '@reusable-parts/common-config/src/environment/firebase.config';
import { LoginPageConfig } from '@reusable-parts/common-config/src/environment/login-page.config';
import { RegisterPageConfig } from '@reusable-parts/common-config/src/environment/register-page.config';
import { FuseConfig } from '@reusable-parts/common-config/src/environment/fuse.config';

export interface EnvironmentInterface {
  production: boolean;

  firebase: FirebaseConfig;

  loginPageConfig: LoginPageConfig;

  registerPageConfig: RegisterPageConfig;

  fuseConfig: FuseConfig;
}
