import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  isLoadingAll,
  shouldLoadAll,
  hasAllErrored,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  userFeatureSelector,
  state => state.loadingUserRoles
);

export const isLoadingAllUserRolesSelector = createSelector(
  selector,
  isLoadingAll
);

export const hasLoadingAllUserRolesErroredSelector = createSelector(
  selector,
  hasAllErrored
);

export const loadingAllUserRolesErrorMessageSelector = createSelector(
  hasLoadingAllUserRolesErroredSelector,
  hasError => hasError && 'There was an issue loading user roles'
);

export const shouldLoadAllUserRolesSelectors = createSelector(
  selector,
  shouldLoadAll
);
