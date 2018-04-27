import { Action } from '@ngrx/store';
import { UserRoles } from '@reusable-parts/user-state/src/user-roles/user-roles/user-roles.state';

export enum UserRolesActionTypes {
  Set = '[User Roles] Set',
}

export class SetUserRoles implements Action {
  public userRoles: UserRoles[];
  readonly type = UserRolesActionTypes.Set;

  constructor(...userRoles: UserRoles[]) {
    this.userRoles = userRoles;
  }
}

export type UserRolesActions = SetUserRoles;
