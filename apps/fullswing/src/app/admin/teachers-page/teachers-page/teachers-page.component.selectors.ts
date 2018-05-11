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
import {
  allUserRoleIdsRemoving,
  hasAnyUserRoleRemoveErroredSelector,
} from '@reusable-parts/user-state/src/user-roles/removing-user-roles/removing-user-roles.selectors';
import { teachersSelector, nonTeachersSelector } from '../../../state/teachers-state/teachers.selectors';

export const loadingSelector = createSelector(
  isLoadingAllUserRolesSelector,
  isLoadingAllUsersSelector,
  (...loadingParts) => loadingParts.some(Boolean),
);

export const errorsSelector = createSelector(
  loadingAllUserRolesErrorMessageSelector,
  loadingAllUsersErrorMessageSelector,
  (...errors) => errors.filter(Boolean),
);

export const teacherModelsSelector = createSelector(teachersSelector, allUserRoleIdsRemoving, (teachers, removingIds) =>
  teachers.map(teacher => ({
    ...teacher,
    disableActions: removingIds.includes(teacher.id),
  })),
);

export const potentialTeacherModelsSelector = createSelector(nonTeachersSelector, users =>
  users.map(user => ({ name: user.name, id: user.id })),
);

export const addTeacherFailedMessageSelector = createSelector(
  hasAnyUserRoleUpdateErroredSelector,
  hasError => hasError && 'Adding user as a teacher failed. Please try agin.',
);

export const removeTeacherFailedMessageSelector = createSelector(
  hasAnyUserRoleRemoveErroredSelector,
  hasError => hasError && 'Removing user as a teacher failed. Please try agin.',
);

export const warningMessagesSelector = createSelector(
  addTeacherFailedMessageSelector,
  removeTeacherFailedMessageSelector,
  (...messages) => messages.filter(Boolean),
);
