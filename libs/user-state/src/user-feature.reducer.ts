import { createFeatureSelector } from '@ngrx/store';
import {
  LoadAllState,
  getDefaultLoadAllState,
} from '@reusable-parts/common-ngrx-patterns';
import { loadingUserRolesReducer } from './user-roles/loading-user-roles/loading-user-roles.reducer';
import { userRolesReducer } from './user-roles/user-roles/user-roles.reducer';
import {
  UserRolesState,
  getInitialUserRolesState,
} from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.state';

export interface UserFeatureState {
  readonly loadingUserRoles: LoadAllState;
  readonly userRoles: UserRolesState;
}

export const userFeatureReducer = {
  loadingUserRoles: loadingUserRolesReducer,
  userRoles: userRolesReducer,
};

export const initialUserFeatureState: UserFeatureState = {
  loadingUserRoles: getDefaultLoadAllState(),
  userRoles: getInitialUserRolesState(),
};

export const userFeatureSelector = createFeatureSelector<UserFeatureState>(
  'userFeature'
);
