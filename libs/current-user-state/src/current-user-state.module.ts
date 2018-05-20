import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { INITIAL_STATE, StoreModule } from '@ngrx/store';
import {
  currentUserFeatureReducer,
  getInitialCurrentUserFeatureState,
} from '@reusable-parts/current-user-state/src/current-user-feature.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('currentUserFeature', currentUserFeatureReducer)],
  providers: [{ provide: INITIAL_STATE, useFactory: getInitialCurrentUserFeatureState }],
})
export class CurrentUserStateModule {}
