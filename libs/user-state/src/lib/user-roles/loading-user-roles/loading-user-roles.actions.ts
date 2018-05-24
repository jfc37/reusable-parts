import { Action } from '@ngrx/store';

export enum LoadingUserRolesActionTypes {
  Reset = '[Loading User Roles] Reset',

  GetAll = '[Loading User Roles] Get All',

  LoadAll = '[Loading User Roles] Load All',
  LoadAllSuccess = '[Loading User Roles] Load All Success',
  LoadAllFailure = '[Loading User Roles] Load All Failure',

  GetByRole = '[Loading User Roles] Get By Role',

  LoadByRole = '[Loading User Roles] Load By Role',
  LoadByRoleSuccess = '[Loading User Roles] Load By Role Success',
  LoadByRoleFailure = '[Loading User Roles] Load By Role Failure',
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

export class GetUserRolesByRole implements Action {
  readonly type = LoadingUserRolesActionTypes.GetByRole;
  constructor(public role: string) {}
}

export class LoadUserRolesByRole implements Action {
  readonly type = LoadingUserRolesActionTypes.LoadByRole;
  constructor(public role: string) {}
}

export class LoadUserRolesByRoleSuccess implements Action {
  readonly type = LoadingUserRolesActionTypes.LoadByRoleSuccess;
  constructor(public role: string) {}
}

export class LoadUserRolesByRoleFailure implements Action {
  readonly type = LoadingUserRolesActionTypes.LoadByRoleFailure;
  constructor(public role: string, public error: string) {}
}

export type LoadingUserRolesActions =
  | ResetAllUserRoles
  | GetAllUserRoles
  | LoadAllUserRoles
  | LoadAllUserRolesSuccess
  | LoadAllUserRolesFailure
  | GetUserRolesByRole
  | LoadUserRolesByRole
  | LoadUserRolesByRoleSuccess
  | LoadUserRolesByRoleFailure;
