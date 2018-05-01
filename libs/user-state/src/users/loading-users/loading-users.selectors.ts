import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  isAnyLoadingSelectorFn,
  hasAnyLoadErroredSelectorFn,
  hasAnyLoadedSelectorFn,
  allLoadingIdsSelectorFn,
  isLoadingIdSelectorFn,
  hasErroredLoadingIdSelectorFn,
  shouldLoadIdSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  userFeatureSelector,
  state => state.loadingUsers
);

export const isLoadingAnyUsersSelector = isAnyLoadingSelectorFn(selector);
export const hasAnyUserLoadErroredSelector = hasAnyLoadErroredSelectorFn(
  selector
);
export const hasAnyUserLoadedSelector = hasAnyLoadedSelectorFn(selector);

export const allUserIdsLoading = allLoadingIdsSelectorFn(selector);

export const isLoadingAllUsersSelector = isLoadingIdSelectorFn(selector, 'all');

export const hasLoadingAllUsersErroredSelector = hasErroredLoadingIdSelectorFn(
  selector,
  'all'
);

export const loadingAllUsersErrorMessageSelector = createSelector(
  hasLoadingAllUsersErroredSelector,
  hasError => hasError && 'There was an issue loading users'
);

export const shouldLoadAllUsersSelectors = shouldLoadIdSelectorFn(
  selector,
  'all'
);
