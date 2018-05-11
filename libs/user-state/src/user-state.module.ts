import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, INITIAL_STATE } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userFeatureReducer, getInitialUserFeatureState } from '@reusable-parts/user-state/src/user-feature.reducer';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/services/firebase-users.service';
import { userFeatureEffects } from '@reusable-parts/user-state/src/user-feature.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('userFeature', userFeatureReducer),
    EffectsModule.forFeature(userFeatureEffects),
  ],
  providers: [
    ...userFeatureEffects,
    FirebaseUsersService,
    { provide: INITIAL_STATE, useFactory: getInitialUserFeatureState },
  ],
})
export class UserStateModule {}
