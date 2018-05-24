import { createSelector } from '@ngrx/store';
import {
  updateAdapter,
  allUpdatingIdsSelectorFn,
  isAnyUpdatingSelectorFn,
  hasAnyUpdateErroredSelectorFn,
  hasAnyUpdatedSelectorFn,
} from '@reusable-parts/common-ngrx-patterns/src';
import { userFeatureSelector } from '@reusable-parts/user-state/src/lib/user-feature.reducer';

const selector = createSelector(userFeatureSelector, state => state.updatingUserRoles);

export const isUpdatingAnyUserRolesSelector = isAnyUpdatingSelectorFn(selector);
export const hasAnyUserRoleUpdateErroredSelector = hasAnyUpdateErroredSelectorFn(selector);
export const hasAnyUserRoleUpdatedSelector = hasAnyUpdatedSelectorFn(selector);

export const allUserRoleIdsUpdating = allUpdatingIdsSelectorFn(selector);
