import { Action } from '@ngrx/store';

export enum TopNavActionTypes {
  GetUser = '[Top Nav] Get User',

  Authenticated = '[Top Nav] Authenticated',
  Unauthenticated = '[Top Nav] Unauthenticated',

  LoggingOut = '[Top Nav] Logging Out',
  LoggedOut = '[Top Nav] Logged Out',
}

export class GetUser implements Action {
  readonly type = TopNavActionTypes.GetUser;
}

export class Authenticated implements Action {
  readonly type = TopNavActionTypes.Authenticated;

  constructor(public displayName: string, public avatarUrl: string) { }
}

export class UnAuthenticated implements Action {
  readonly type = TopNavActionTypes.Unauthenticated;
}

export class LoggingOut implements Action {
  readonly type = TopNavActionTypes.LoggingOut;
}

export class LoggedOut implements Action {
  readonly type = TopNavActionTypes.LoggedOut;
}

export type TopNavActions
  = GetUser
  | Authenticated
  | UnAuthenticated
  | LoggingOut
  | LoggedOut;
