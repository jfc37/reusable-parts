import { createSelector } from '@ngrx/store';
import { currentUserFeatureSelector } from '@reusable-parts/current-user-state/src/current-user-feature.reducer';

export const currentUserIdSelector = createSelector(
  currentUserFeatureSelector,
  state => state.currentUser,
);
