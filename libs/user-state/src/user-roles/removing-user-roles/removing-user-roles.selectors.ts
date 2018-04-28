import { createSelector } from '@ngrx/store';
import { userFeatureSelector } from '@reusable-parts/user-state/src/user-feature.reducer';
import {
  updateAdapter,
  allDeletingIdsSelectorFn,
  isAnyDeletingSelectorFn,
  hasAnyDeleteErroredSelectorFn,
  hasAnyDeletedSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  userFeatureSelector,
  state => state.removingUserRoles
);

export const isRemovingAnyUserRolesSelector = isAnyDeletingSelectorFn(selector);
export const hasAnyUserRoleRemoveErroredSelector = hasAnyDeleteErroredSelectorFn(
  selector
);
export const hasAnyUserRoleRemovedSelector = hasAnyDeletedSelectorFn(selector);

export const allUserRoleIdsRemoving = allDeletingIdsSelectorFn(selector);
