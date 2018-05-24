import { Action } from '@ngrx/store';
import { User } from './users.state';

export enum UsersActionTypes {
  Set = '[Users] Set',
}

export class SetUsers implements Action {
  public users: User[];
  readonly type = UsersActionTypes.Set;

  constructor(...users: User[]) {
    this.users = users;
  }
}

export type UsersActions = SetUsers;
