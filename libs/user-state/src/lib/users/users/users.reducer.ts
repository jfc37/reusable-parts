import { UsersActions, UsersActionTypes } from './users.actions';
import { User, getInitialUserState, userAdapter, UserState } from './users.state';
import { Update } from '@ngrx/entity';

export function usersReducer(state = getInitialUserState(), action: UsersActions): UserState {
  switch (action.type) {
    case UsersActionTypes.Set:
      return userAdapter.upsertMany(action.users, state);

    default:
      return state;
  }
}
