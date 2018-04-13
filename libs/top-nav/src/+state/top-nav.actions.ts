import { Action } from '@ngrx/store';

export enum TopNavActionTypes {
  Initialise = '[Top Nav] Initialise',

  SetLoginStatus = '[Top Nav] Set Login Status',
  SetDisplayName = '[Top Nav] Set Display Name',
  SetAvatarUrl = '[Top Nav] Set Avatar Url',

  LogOut = '[Top Nav] Log Out',

}

export class InitialiseTopNav implements Action {
  readonly type = TopNavActionTypes.Initialise;
}

export class SetLogInStatus implements Action {
  readonly type = TopNavActionTypes.SetLoginStatus;

  constructor(public isLoggedIn: boolean) { }
}

export class SetDisplayName implements Action {
  readonly type = TopNavActionTypes.SetDisplayName;

  constructor(public displayName: string) { }
}

export class SetAvatarUrl implements Action {
  readonly type = TopNavActionTypes.SetAvatarUrl;

  constructor(public avatarUrl: string) { }
}

export class LogOut implements Action {
  readonly type = TopNavActionTypes.LogOut;
}

export type TopNavActions
  = InitialiseTopNav
  | SetLogInStatus
  | SetDisplayName
  | SetAvatarUrl;
