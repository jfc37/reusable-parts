import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { WelcomeModule } from '@reusable-parts/welcome/src';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';
import { DumbForgotPasswordComponent } from './components/dumb-forgot-password/dumb-forgot-password.component';
import { StoreModule } from '@ngrx/store';
import { resetReducer, resetInitialState } from '@reusable-parts/forgot-password-page/src/lib/+state/reset.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ResetEffects } from '@reusable-parts/forgot-password-page/src/lib/+state/reset.effects';
import { FirebaseResetService } from '@reusable-parts/forgot-password-page/src/lib/services/firebase-reset.service';

@NgModule({
  imports: [
    CommonModule,

    WelcomeModule,
    CommonUiComponentsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ForgotPasswordPageComponent }]),

    StoreModule.forFeature('forgotPassword', resetReducer, {
      initialState: resetInitialState,
    }),

    EffectsModule.forFeature([ResetEffects]),
  ],
  declarations: [ForgotPasswordPageComponent, DumbForgotPasswordComponent],
  providers: [FirebaseResetService, { provide: 'BASEURL', useFactory: baseUrlFactory }],
})
export class ForgotPasswordPageModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ForgotPasswordPageModule,
  ) {
    if (parentModule) {
      throw new Error('ForgotPasswordPageModule is already loaded. Import it in the AppModule only!');
    }
  }
}

export function baseUrlFactory() {
  return window.location.origin;
}
