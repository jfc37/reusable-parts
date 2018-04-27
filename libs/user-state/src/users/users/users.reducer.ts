import { UsersActions, UsersActionTypes } from './users.actions';
import {
  User,
  getInitialUserState,
  userAdapter,
  UserState,
} from './users.state';

export function usersReducer(
  state = getInitialUserState(),
  action: UsersActions
): UserState {
  switch (action.type) {
    case UsersActionTypes.Set:
      return userAdapter.addAll(action.users, state);

    default:
      return state;
  }
}
