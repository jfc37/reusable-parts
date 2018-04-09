import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from '@reusable-parts/login';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginPageConfig, LOGIN_PAGE_CONFIG } from '../../../lib-config/login-page.config';

@NgModule({
  imports: [
    LoginModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LoginPageComponent}
    ])
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {
  constructor(@Optional() @SkipSelf() parentModule: LoginPageModule)
  {
      if ( parentModule )
      {
          throw new Error('LoginPageModule is already loaded. Import it in the AppModule only!');
      }
  }

  static forRoot(config: LoginPageConfig): ModuleWithProviders
  {
      return {
          ngModule : LoginPageModule,
          providers: [
              {
                  provide : LOGIN_PAGE_CONFIG,
                  useValue: config
              }
          ]
      };
  }
}
