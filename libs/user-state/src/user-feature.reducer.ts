import { createFeatureSelector } from '@ngrx/store';
import {
  LoadStatus,
  getDefaultUpdateStatus,
  updateAdapter,
  UpdateStatus,
  DeleteStatus,
  deleteAdapter,
  getInitialUpdateState,
  getInitialDeleteState,
  getInitialLoadState,
} from '@reusable-parts/common-ngrx-patterns';
import { loadingUserRolesReducer } from './user-roles/loading-user-roles/loading-user-roles.reducer';
import { userRolesReducer } from './user-roles/user-roles/user-roles.reducer';
import {
  UserRolesState,
  getInitialUserRolesState,
} from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.state';
import { UserState, getInitialUserState } from '@reusable-parts/user-state/src/users/users/users.state';
import { usersReducer } from '@reusable-parts/user-state/src/users/users/users.reducer';
import { loadingUsersReducer } from '@reusable-parts/user-state/src/users/loading-users/loading-users.reducer';
import { updatingUserRolesReducer } from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.reducer';
import { EntityState } from '@ngrx/entity';
import { removingUserRolesReducer } from '@reusable-parts/user-state/src/user-roles/removing-user-roles/removing-user-roles.reducer';

export interface UserFeatureState {
  readonly loadingUserRoles: EntityState<LoadStatus>;
  readonly updatingUserRoles: EntityState<UpdateStatus>;
  readonly removingUserRoles: EntityState<DeleteStatus>;
  readonly userRoles: UserRolesState;

  readonly loadingUsers: EntityState<LoadStatus>;
  readonly users: UserState;
}

export const userFeatureReducer = {
  loadingUserRoles: loadingUserRolesReducer,
  updatingUserRoles: updatingUserRolesReducer,
  removingUserRoles: removingUserRolesReducer,
  userRoles: userRolesReducer,

  loadingUsers: loadingUsersReducer,
  users: usersReducer,
};

export function getInitialUserFeatureState(): UserFeatureState {
  return {
    loadingUserRoles: getInitialLoadState(),
    updatingUserRoles: getInitialUpdateState(),
    removingUserRoles: getInitialDeleteState(),
    userRoles: getInitialUserRolesState(),

    loadingUsers: getInitialLoadState(),
    users: getInitialUserState(),
  };
}

export const userFeatureSelector = createFeatureSelector<UserFeatureState>('userFeature');
