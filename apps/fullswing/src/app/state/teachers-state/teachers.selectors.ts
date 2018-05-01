import {
  allUsersWithRoleFactory,
  allUsersWithoutRoleFactory,
} from '@reusable-parts/user-state/src/users/users/users.selectors';
import { FullSwingRoleTypes } from '../../authorisation/roles';
import { userIdsWithRoleSelectorFactory } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.selectors';
import { createSelector } from '@ngrx/store';

export const teachersSelector = allUsersWithRoleFactory(
  FullSwingRoleTypes.Teacher
);

export const nonTeachersSelector = allUsersWithoutRoleFactory(
  FullSwingRoleTypes.Teacher
);

export const teacherIdsSelector = userIdsWithRoleSelectorFactory(
  FullSwingRoleTypes.Teacher
);

export const teacherOptionsSelector = createSelector(
  teachersSelector,
  teachers =>
    teachers.map(teacher => ({ label: teacher.name, value: teacher.id }))
);
