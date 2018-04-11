import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { RegisterModule } from '@reusable-parts/register';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { registerReducer, initialState as registerInitialState } from './+state/register.reducer';
import { RegisterEffects } from './+state/register.effects';
import { FirebaseRegistrationService } from '@reusable-parts/register-page/src/service/firebase-registration.service';

@NgModule({
  imports: [
    CommonModule,

    RegisterModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: RegisterPageComponent}
    ]),

    StoreModule.forFeature('register', registerReducer, { initialState: registerInitialState }),

    EffectsModule.forFeature([RegisterEffects])
  ],
  declarations: [RegisterPageComponent],
  providers: [
    RegisterEffects,
    FirebaseRegistrationService,
  ],
})
export class RegisterPageModule {
  constructor(@Optional() @SkipSelf() parentModule: RegisterPageModule)
  {
      if ( parentModule )
      {
          throw new Error('RegisterPageModule is already loaded. Import it in the AppModule only!');
      }
  }
}
