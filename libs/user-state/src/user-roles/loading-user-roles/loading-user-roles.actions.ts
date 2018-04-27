import { Action } from '@ngrx/store';

export enum LoadingUserRolesActionTypes {
  Reset = '[Loading User Roles] Reset',

  GetAll = '[Loading User Roles] Get All',

  LoadAll = '[Loading User Roles] Load All',
  LoadAllSuccess = '[Loading User Roles] Load All Success',
  LoadAllFailure = '[Loading User Roles] Load All Failure',
}

export class ResetAllUserRoles implements Action {
  readonly type = LoadingUserRolesActionTypes.Reset;
}

export class GetAllUserRoles implements Action {
  readonly type = LoadingUserRolesActionTypes.GetAll;
}

export class LoadAllUserRoles implements Action {
  readonly type = LoadingUserRolesActionTypes.LoadAll;
}

export class LoadAllUserRolesSuccess implements Action {
  readonly type = LoadingUserRolesActionTypes.LoadAllSuccess;
}

export class LoadAllUserRolesFailure implements Action {
  readonly type = LoadingUserRolesActionTypes.LoadAllFailure;
  constructor(public error: string) {}
}

export type LoadingUserRolesActions =
  | ResetAllUserRoles
  | LoadAllUserRoles
  | LoadAllUserRolesSuccess
  | LoadAllUserRolesFailure;
