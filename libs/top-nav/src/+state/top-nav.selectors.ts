import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TopNavData } from '@reusable-parts/top-nav/src/+state/top-nav.reducer';

const topNavSelector = createFeatureSelector<TopNavData>('topNav');

export const isLoadingSelector = createSelector(topNavSelector, state => state.loading);

export const isAuthenticatedSelector = createSelector(topNavSelector, state => state.authenticated);

export const displayNameSelector = createSelector(topNavSelector, state => state.displayName);

export const avatarUrlSelector = createSelector(topNavSelector, state => state.avatarUrl);

export const hasLoggedOutSelector = createSelector(topNavSelector, state => state.loggedOut);
