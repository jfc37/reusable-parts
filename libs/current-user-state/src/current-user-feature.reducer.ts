import { createFeatureSelector } from '@ngrx/store';
import { currentUserReducer } from '@reusable-parts/current-user-state/src/current-user/current-user.reducer';

export interface CurrentUserFeatureState {
  readonly currentUser: string;
}

export const currentUserFeatureReducer = {
  currentUser: currentUserReducer,
};

export function getInitialCurrentUserFeatureState(): CurrentUserFeatureState {
  return {
    currentUser: null,
  };
}

export const currentUserFeatureSelector = createFeatureSelector<CurrentUserFeatureState>('currentUserFeature');
