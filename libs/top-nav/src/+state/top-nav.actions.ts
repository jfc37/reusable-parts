import { Action } from '@ngrx/store';

export enum TopNavActionTypes {
  GetUser = '[Top Nav] Get User',

  Authenticated = '[Top Nav] Authenticated',
  Unauthenticated = '[Top Nav] Unauthenticated',
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

export type TopNavActions
  = GetUser
  | Authenticated
  | UnAuthenticated;
