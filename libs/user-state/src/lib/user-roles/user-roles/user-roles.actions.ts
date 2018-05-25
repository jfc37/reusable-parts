import { Action } from '@ngrx/store';
import { UserRoles } from '@reusable-parts/user-state/src/lib/user-roles/user-roles/user-roles.state';

export enum UserRolesActionTypes {
  Set = '[User Roles] Set',
  Add = '[User Roles] Add',
  Remove = '[User Roles] Remove',
}

export class SetUserRoles implements Action {
  public userRoles: UserRoles[];
  readonly type = UserRolesActionTypes.Set;

  constructor(...userRoles: UserRoles[]) {
    this.userRoles = userRoles;
  }
}

export class AddUserRole implements Action {
  readonly type = UserRolesActionTypes.Add;

  constructor(public id: string, public role: string) {}
}

export class RemoveUserRole implements Action {
  readonly type = UserRolesActionTypes.Remove;

  constructor(public id: string, public role: string) {}
}

export type UserRolesActions = SetUserRoles | AddUserRole | RemoveUserRole;