import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  isAnyLoadingSelectorFn,
  hasAnyLoadedSelectorFn,
  hasAnyLoadErroredSelectorFn,
  allLoadingIdsSelectorFn,
  isLoadingIdSelectorFn,
  hasErroredLoadingIdSelectorFn,
  shouldLoadIdSelectorFn,
  allLoadErroredIdsSelectorFn,
  allLoadedSelectorFn,
  allLoadingOrLoadedSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  userFeatureSelector,
  state => state.loadingUserRoles
);

export const isLoadingAnyUserRolesSelector = isAnyLoadingSelectorFn(selector);
export const hasAnyUserRoleLoadErroredSelector = hasAnyLoadErroredSelectorFn(
  selector
);
export const hasAnyUserRoleLoadedSelector = hasAnyLoadedSelectorFn(selector);

export const allUserRoleIdsLoading = allLoadingIdsSelectorFn(selector);
export const allUserRoleIdsLoaded = allLoadedSelectorFn(selector);
export const allUserRoleIdsLoadingOrLoaded = allLoadingOrLoadedSelectorFn(
  selector
);
export const allUserRoleIdsErrored = allLoadErroredIdsSelectorFn(selector);

export const isLoadingAllUserRolesSelector = isLoadingIdSelectorFn(
  selector,
  'all'
);

export const hasLoadingAllUserRolesErroredSelector = hasErroredLoadingIdSelectorFn(
  selector,
  'all'
);

export const loadingAllUserRolesErrorMessageSelector = createSelector(
  hasLoadingAllUserRolesErroredSelector,
  hasError => hasError && 'There was an issue loading user roles'
);

export const shouldLoadAllUserRolesSelectors = shouldLoadIdSelectorFn(
  selector,
  'all'
);
