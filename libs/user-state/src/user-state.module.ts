import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  userFeatureEffects,
  userFeatureReducer,
  initialUserFeatureState,
} from '@reusable-parts/user-state/src/user-feature.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('userFeature', userFeatureReducer, {
      initialState: initialUserFeatureState,
    }),
    EffectsModule.forFeature(userFeatureEffects),
  ],
  providers: [...userFeatureEffects],
})
export class UserStateModule {}
