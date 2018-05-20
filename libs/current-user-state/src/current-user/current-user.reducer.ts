import {
  CurrentUserActions,
  CurrentUserActionTypes,
} from '@reusable-parts/current-user-state/src/current-user/current-user.actions';

export function currentUserReducer(state = null, action: CurrentUserActions): string {
  switch (action.type) {
    case CurrentUserActionTypes.Set:
      return action.id;

    case CurrentUserActionTypes.Reset:
      return null;

    default:
      return state;
  }
}
