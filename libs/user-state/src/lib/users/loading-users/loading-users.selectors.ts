import { createSelector } from '@ngrx/store';
import {
  isAnyLoadingSelectorFn,
  hasAnyLoadErroredSelectorFn,
  hasAnyLoadedSelectorFn,
  allLoadingIdsSelectorFn,
  isLoadingIdSelectorFn,
  hasErroredLoadingIdSelectorFn,
  shouldLoadIdSelectorFn,
  allLoadedSelectorFn,
  allLoadingOrLoadedIdsSelectorFn,
  allLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns/src';
import { userFeatureSelector } from '@reusable-parts/user-state/src/lib/user-feature.reducer';

const selector = createSelector(
  userFeatureSelector,
  state => state.loadingUsers,
);

export const isLoadingAnyUsersSelector = isAnyLoadingSelectorFn(selector);
export const hasAnyUserLoadErroredSelector = hasAnyLoadErroredSelectorFn(selector);
export const hasAnyUserLoadedSelector = hasAnyLoadedSelectorFn(selector);

export const allUserIdsLoading = allLoadingIdsSelectorFn(selector);
export const allUserIdsLoaded = allLoadedIdsSelectorFn(selector);
export const allUserIdsLoadingOrLoaded = allLoadingOrLoadedIdsSelectorFn(selector);

export const isLoadingAllUsersSelector = isLoadingIdSelectorFn(selector, 'all');

export const hasLoadingAllUsersErroredSelector = hasErroredLoadingIdSelectorFn(selector, 'all');

export const loadingAllUsersErrorMessageSelector = createSelector(
  hasLoadingAllUsersErroredSelector,
  hasError => hasError && 'There was an issue loading users',
);

export const shouldLoadAllUsersSelectors = shouldLoadIdSelectorFn(selector, 'all');
