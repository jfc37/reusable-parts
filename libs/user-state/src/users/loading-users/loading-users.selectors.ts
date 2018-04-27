import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  isLoadingAll,
  shouldLoadAll,
  hasAllErrored,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  userFeatureSelector,
  state => state.loadingUsers
);

export const isLoadingAllUsersSelector = createSelector(selector, isLoadingAll);

export const hasLoadingAllUsersErroredSelector = createSelector(
  selector,
  hasAllErrored
);

export const loadingAllUsersErrorMessageSelector = createSelector(
  hasLoadingAllUsersErroredSelector,
  hasError => hasError && 'There was an issue loading users'
);

export const shouldLoadAllUsersSelectors = createSelector(
  selector,
  shouldLoadAll
);
