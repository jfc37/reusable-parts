import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { registerReducer, initialState as registerInitialState } from './+state/register.reducer';
import { RegisterEffects } from './+state/register.effects';
import { FirebaseRegistrationService } from '@reusable-parts/register-page/src/lib/service/firebase-registration.service';
import { WelcomeModule } from '@reusable-parts/welcome/src';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@reusable-parts/fuse/src/lib/@fuse';
import { DumbRegisterComponent } from '@reusable-parts/register-page/src/lib/components/dumb-register/dumb-register.component';
import { CommonUiComponentsModule } from '@reusable-parts/common-ui-components/src';

@NgModule({
  imports: [
    CommonModule,

    WelcomeModule,
    CommonUiComponentsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,

    FuseSharedModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: RegisterPageComponent }]),

    StoreModule.forFeature('register', registerReducer, {
      initialState: registerInitialState,
    }),

    EffectsModule.forFeature([RegisterEffects]),
  ],
  declarations: [RegisterPageComponent, DumbRegisterComponent],
  providers: [RegisterEffects, FirebaseRegistrationService],
})
export class RegisterPageModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: RegisterPageModule,
  ) {
    if (parentModule) {
      throw new Error('RegisterPageModule is already loaded. Import it in the AppModule only!');
    }
  }
}
