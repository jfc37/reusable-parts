import { createFeatureSelector } from '@ngrx/store';
import {
  LoadAllState,
  getDefaultLoadAllState,
} from '@reusable-parts/common-ngrx-patterns';
import { loadingUserRolesReducer } from './user-roles/loading-user-roles/loading-user-roles.reducer';

export interface UserFeatureState {
  readonly loadingUserRoles: LoadAllState;
}

export const userFeatureReducer = {
  loadingUserRoles: loadingUserRolesReducer,
};

export const initialUserFeatureState: UserFeatureState = {
  loadingUserRoles: getDefaultLoadAllState(),
};

export const userFeatureSelector = createFeatureSelector<UserFeatureState>(
  'userFeature'
);
