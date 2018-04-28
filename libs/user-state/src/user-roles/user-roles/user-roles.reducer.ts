import { UserRolesActions, UserRolesActionTypes } from './user-roles.actions';
import {
  UserRoles,
  getInitialUserRolesState,
  userRolesAdapter,
  UserRolesState,
} from './user-roles.state';

export function userRolesReducer(
  state = getInitialUserRolesState(),
  action: UserRolesActions
): UserRolesState {
  switch (action.type) {
    case UserRolesActionTypes.Set:
      return userRolesAdapter.addAll(action.userRoles, state);

    default:
      return state;
  }
}