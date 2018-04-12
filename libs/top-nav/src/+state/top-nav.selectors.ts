import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TopNavData } from "@reusable-parts/top-nav/src/+state/top-nav.reducer";

const topNavSelector = createFeatureSelector<TopNavData>('topNav');

export const isLoggedInSelector = createSelector(
  topNavSelector,
  state => state.loggedIn
);

export const displayNameSelector = createSelector(
  topNavSelector,
  state => state.displayName
);

export const avatarUrlSelector = createSelector(
  topNavSelector,
  state => state.avatarUrl
);
