import { UserRolesActions, UserRolesActionTypes } from './user-roles.actions';
import { UserRoles, getInitialUserRolesState, userRolesAdapter, UserRolesState } from './user-roles.state';

export function userRolesReducer(state = getInitialUserRolesState(), action: UserRolesActions): UserRolesState {
  switch (action.type) {
    case UserRolesActionTypes.Set:
      return userRolesAdapter.addAll(action.userRoles, state);

    case UserRolesActionTypes.Add:
      return userRolesAdapter.updateOne({ id: action.id, changes: { [action.role]: true } }, state);

    case UserRolesActionTypes.Remove:
      return userRolesAdapter.updateOne({ id: action.id, changes: { [action.role]: false } }, state);

    default:
      return state;
  }
}
