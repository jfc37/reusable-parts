import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  isLoadingAll,
  shouldLoadAll,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  userFeatureSelector,
  state => state.loadingUserRoles
);

export const isLoadingAllUserRolesSelector = createSelector(
  selector,
  isLoadingAll
);

export const shouldLoadAllUserRolesSelectors = createSelector(
  selector,
  shouldLoadAll
);
