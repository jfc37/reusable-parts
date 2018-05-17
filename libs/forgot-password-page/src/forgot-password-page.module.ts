import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { WelcomeModule } from '@reusable-parts/welcome';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/@fuse';
import { DumbForgotPasswordComponent } from './components/dumb-forgot-password/dumb-forgot-password.component';

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
  ],
  declarations: [ForgotPasswordPageComponent, DumbForgotPasswordComponent],
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
