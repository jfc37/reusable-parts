import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginModule } from '@reusable-parts/login';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginPageConfig, LOGIN_PAGE_CONFIG } from '../../../lib-config/login-page.config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loginReducer, initialState as loginInitialState } from './+state/login.reducer';
import { LoginEffects } from './+state/login.effects';

@NgModule({
  imports: [
    LoginModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LoginPageComponent}
    ]),

    StoreModule.forFeature('login', loginReducer, { initialState: loginInitialState }),

    EffectsModule.forFeature([LoginEffects])
  ],
  declarations: [LoginPageComponent],
  providers: [LoginEffects],
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
