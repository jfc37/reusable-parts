import { Action } from '@ngrx/store';

export enum RemovingUserRolesActionTypes {
  Reset = '[Removing User Roles] Reset',

  RemoveAttempt = '[Removing User Roles] Attempt',

  RemoveRequest = '[Removing User Roles] Request',
  RemoveSuccess = '[Removing User Roles] Success',
  RemoveFailure = '[Removing User Roles] Failure',
}

export class ResetRemoveUserRoles implements Action {
  readonly type = RemovingUserRolesActionTypes.Reset;
}

export class AttemptToRemoveUserRoles implements Action {
  readonly type = RemovingUserRolesActionTypes.RemoveAttempt;
  constructor(public id: string, public role: string) {}
}

export class RemoveUserRolesRequest implements Action {
  readonly type = RemovingUserRolesActionTypes.RemoveRequest;
  constructor(public id: string, public role: string) {}
}

export class RemoveUserRolesSuccess implements Action {
  readonly type = RemovingUserRolesActionTypes.RemoveSuccess;
  constructor(public id: string) {}
}

export class RemoveUserRolesFailure implements Action {
  readonly type = RemovingUserRolesActionTypes.RemoveFailure;
  constructor(public id: string, public error: string) {}
}

export type RemovingUserRolesActions =
  | ResetRemoveUserRoles
  | AttemptToRemoveUserRoles
  | RemoveUserRolesRequest
  | RemoveUserRolesSuccess
  | RemoveUserRolesFailure;
