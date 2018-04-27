import { Action } from '@ngrx/store';

export enum LoadingUsersActionTypes {
  Reset = '[Loading User] Reset',

  GetAll = '[Loading User] Get All',

  LoadAll = '[Loading User] Load All',
  LoadAllSuccess = '[Loading User] Load All Success',
  LoadAllFailure = '[Loading User] Load All Failure',
}

export class ResetAllUsers implements Action {
  readonly type = LoadingUsersActionTypes.Reset;
}

export class GetAllUsers implements Action {
  readonly type = LoadingUsersActionTypes.GetAll;
}

export class LoadAllUsers implements Action {
  readonly type = LoadingUsersActionTypes.LoadAll;
}

export class LoadAllUsersSuccess implements Action {
  readonly type = LoadingUsersActionTypes.LoadAllSuccess;
}

export class LoadAllUsersFailure implements Action {
  readonly type = LoadingUsersActionTypes.LoadAllFailure;
  constructor(public error: string) {}
}

export type LoadingUsersActions =
  | ResetAllUsers
  | LoadAllUsers
  | LoadAllUsersSuccess
  | LoadAllUsersFailure;
