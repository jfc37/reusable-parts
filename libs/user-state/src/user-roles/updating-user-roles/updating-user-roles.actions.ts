import { Action } from '@ngrx/store';

export enum UpdatingUserRolesActionTypes {
  Reset = '[Updating User Roles] Reset',

  UpdateAttempt = '[Updating User Roles] Attempt',

  UpdateRequest = '[Updating User Roles] Request',
  UpdateSuccess = '[Updating User Roles] Success',
  UpdateFailure = '[Updating User Roles] Failure',
}

export class ResetUpdateUserRoles implements Action {
  readonly type = UpdatingUserRolesActionTypes.Reset;
}

export class AttemptToUpdateUserRoles implements Action {
  readonly type = UpdatingUserRolesActionTypes.UpdateAttempt;
  constructor(public id: string, public role: string) {}
}

export class UpdateUserRolesRequest implements Action {
  readonly type = UpdatingUserRolesActionTypes.UpdateRequest;
  constructor(public id: string, public role: string) {}
}

export class UpdateUserRolesSuccess implements Action {
  readonly type = UpdatingUserRolesActionTypes.UpdateSuccess;
  constructor(public id: string) {}
}

export class UpdateUserRolesFailure implements Action {
  readonly type = UpdatingUserRolesActionTypes.UpdateFailure;
  constructor(public id: string, public error: string) {}
}

export type UpdatingUserRolesActions =
  | ResetUpdateUserRoles
  | AttemptToUpdateUserRoles
  | UpdateUserRolesRequest
  | UpdateUserRolesSuccess
  | UpdateUserRolesFailure;
