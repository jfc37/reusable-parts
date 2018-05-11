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
  allLoadingOrLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(userFeatureSelector, state => state.loadingUserRoles);

export const isLoadingAnyUserRolesSelector = isAnyLoadingSelectorFn(selector);
export const hasAnyUserRoleLoadErroredSelector = hasAnyLoadErroredSelectorFn(selector);
export const hasAnyUserRoleLoadedSelector = hasAnyLoadedSelectorFn(selector);

export const allUserRoleIdsLoading = allLoadingIdsSelectorFn(selector);
export const allUserRoleIdsLoaded = allLoadedSelectorFn(selector);
export const allUserRoleIdsLoadingOrLoaded = allLoadingOrLoadedIdsSelectorFn(selector);
export const allUserRoleIdsErrored = allLoadErroredIdsSelectorFn(selector);

export function isLoadingUserRolesSelectorFn(roleType: string) {
  return isLoadingIdSelectorFn(selector, roleType);
}
export const isLoadingAllUserRolesSelector = isLoadingUserRolesSelectorFn('all');

export function hasLoadingUserRolesErroredSelectorFn(roleType: string) {
  return hasErroredLoadingIdSelectorFn(selector, roleType);
}

export const hasLoadingAllUserRolesErroredSelector = hasLoadingUserRolesErroredSelectorFn('all');

export const loadingAllUserRolesErrorMessageSelector = createSelector(
  hasLoadingAllUserRolesErroredSelector,
  hasError => hasError && 'There was an issue loading user roles',
);

export const shouldLoadAllUserRolesSelectors = shouldLoadIdSelectorFn(selector, 'all');
