import { Action } from '@ngrx/store';

export enum CurrentUserActionTypes {
  Set = '[Current User] Set',
  Reset = '[Current User] Reset',
}

export class SetCurrentUser implements Action {
  readonly type = CurrentUserActionTypes.Set;

  constructor(public id: string) {}
}

export class ResetCurrentUser implements Action {
  readonly type = CurrentUserActionTypes.Reset;
}

export type CurrentUserActions = SetCurrentUser | ResetCurrentUser;
