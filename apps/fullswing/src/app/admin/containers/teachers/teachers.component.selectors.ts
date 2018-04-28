import { createSelector } from '@ngrx/store';
import {
  isLoadingAllUserRolesSelector,
  loadingAllUserRolesErrorMessageSelector,
} from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.selectors';
import {
  isLoadingAllUsersSelector,
  loadingAllUsersErrorMessageSelector,
} from '@reusable-parts/user-state/src/users/loading-users/loading-users.selectors';
import { allUsersWithRoleFactory } from '@reusable-parts/user-state/src/users/users/users.selectors';
import { FullSwingRoleTypes } from '../../../authorisation/roles';

export const loadingSelector = createSelector(
  isLoadingAllUserRolesSelector,
  isLoadingAllUsersSelector,
  (...loadingParts) => loadingParts.some(Boolean)
);

export const errorsSelector = createSelector(
  loadingAllUserRolesErrorMessageSelector,
  loadingAllUsersErrorMessageSelector,
  (...errors) => errors.filter(Boolean)
);

export const teachersSelector = allUsersWithRoleFactory(
  FullSwingRoleTypes.Teacher
);