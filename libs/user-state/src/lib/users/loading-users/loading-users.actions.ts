import { Action } from '@ngrx/store';

export enum LoadingUsersActionTypes {
  Reset = '[Loading User] Reset',

  GetAll = '[Loading User] Get All',

  LoadAll = '[Loading User] Load All',
  LoadAllSuccess = '[Loading User] Load All Success',
  LoadAllFailure = '[Loading User] Load All Failure',

  Get = '[Loading User] Get',

  Load = '[Loading User] Load',
  LoadSuccess = '[Loading User] Load Success',
  LoadFailure = '[Loading User] Load Failure',
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

export class GetUser implements Action {
  readonly type = LoadingUsersActionTypes.Get;
  constructor(public id: string) {}
}

export class LoadUser implements Action {
  readonly type = LoadingUsersActionTypes.Load;
  constructor(public id: string) {}
}

export class LoadUserSuccess implements Action {
  readonly type = LoadingUsersActionTypes.LoadSuccess;
  constructor(public id: string) {}
}

export class LoadUserFailure implements Action {
  readonly type = LoadingUsersActionTypes.LoadFailure;
  constructor(public id: string, public error: string) {}
}

export type LoadingUsersActions =
  | ResetAllUsers
  | LoadAllUsers
  | LoadAllUsersSuccess
  | LoadAllUsersFailure
  | GetUser
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailure;
