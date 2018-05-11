import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginPageConfig } from '../../../lib-config/login-page.config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { loginReducer, initialState as loginInitialState } from './+state/login.reducer';
import { LoginEffects } from './+state/login.effects';
import { CommonModule } from '@angular/common';
import { FirebaseLoginService } from '@reusable-parts/login-page/src/services/firebase-login.service';
import { DumbLoginComponent } from '@reusable-parts/login-page/src/components/dumb-login/dumb-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeModule } from '@reusable-parts/welcome';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    WelcomeModule,
    CommonUiComponentsModule,

    // angular material components
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: LoginPageComponent }]),

    StoreModule.forFeature('login', loginReducer, {
      initialState: loginInitialState,
    }),

    EffectsModule.forFeature([LoginEffects]),
  ],
  declarations: [LoginPageComponent, DumbLoginComponent],
  providers: [FirebaseLoginService, LoginEffects],
})
export class LoginPageModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LoginPageModule,
  ) {
    if (parentModule) {
      throw new Error('LoginPageModule is already loaded. Import it in the AppModule only!');
    }
  }
}
