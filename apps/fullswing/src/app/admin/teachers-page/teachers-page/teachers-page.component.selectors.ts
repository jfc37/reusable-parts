import { createSelector } from '@ngrx/store';
import {
  isLoadingAllUserRolesSelector,
  loadingAllUserRolesErrorMessageSelector,
} from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.selectors';
import {
  isLoadingAllUsersSelector,
  loadingAllUsersErrorMessageSelector,
} from '@reusable-parts/user-state/src/users/loading-users/loading-users.selectors';
import {
  allUsersWithRoleFactory,
  allUsersWithoutRoleFactory,
} from '@reusable-parts/user-state/src/users/users/users.selectors';
import { FullSwingRoleTypes } from '../../../authorisation/roles';
import { hasAnyUserRoleUpdateErroredSelector } from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.selectors';

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

export const nonTeachersSelector = allUsersWithoutRoleFactory(
  FullSwingRoleTypes.Teacher
);

export const teacherModelsSelector = createSelector(
  teachersSelector,
  teachers => teachers.map(teacher => ({ ...teacher, disableActions: true }))
);

export const potentialTeacherModelsSelector = createSelector(
  nonTeachersSelector,
  users => users.map(user => ({ name: user.name, id: user.id }))
);

export const addTeacherFailedMessageSelector = createSelector(
  hasAnyUserRoleUpdateErroredSelector,
  hasError => hasError && 'Adding user as a teacher failed. Please try agin.'
);

export const warningMessagesSelector = createSelector(
  addTeacherFailedMessageSelector,
  (...messages) => messages.filter(Boolean)
);
