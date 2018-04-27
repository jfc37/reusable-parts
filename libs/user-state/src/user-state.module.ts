import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  userFeatureReducer,
  initialUserFeatureState,
} from '@reusable-parts/user-state/src/user-feature.reducer';
import { FirebaseUsersService } from '@reusable-parts/user-state/src/services/firebase-users.service';
import { userFeatureEffects } from '@reusable-parts/user-state/src/user-feature.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('userFeature', userFeatureReducer, {
      initialState: initialUserFeatureState,
    }),
    EffectsModule.forFeature(userFeatureEffects),
  ],
  providers: [...userFeatureEffects, FirebaseUsersService],
})
export class UserStateModule {}
