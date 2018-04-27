import {
  LoadAllState,
  getDefaultLoadAllState,
} from '@reusable-parts/common-ngrx-patterns';
import { loadingUserRolesReducer } from './user-roles/loading-user-roles/loading-user-roles.reducer';
import { LoadingUserRolesEffects } from '@reusable-parts/user-state/src/user-roles/loading-user-roles/loading-user-roles.effects';
import { createFeatureSelector } from '@ngrx/store';

export interface UserFeatureState {
  readonly loadingUserRoles: LoadAllState;
}

export const userFeatureReducer = {
  loadingUserRoles: loadingUserRolesReducer,
};

export const userFeatureEffects = [LoadingUserRolesEffects];

export const initialUserFeatureState: UserFeatureState = {
  loadingUserRoles: getDefaultLoadAllState(),
};

export const userFeatureSelector = createFeatureSelector<UserFeatureState>(
  'userFeature'
);
