import {
  LoadAllState,
  getDefaultLoadAllState,
  getLoadedAllErrorState,
  getLoadedAllState,
  getLoadingAllState,
} from '@reusable-parts/common-ngrx-patterns';
import {
  LoadingUsersActionTypes,
  LoadingUsersActions,
} from './loading-users.actions';

export function loadingUsersReducer(
  state = getDefaultLoadAllState(),
  action: LoadingUsersActions
): LoadAllState {
  switch (action.type) {
    case LoadingUsersActionTypes.Reset:
      return getDefaultLoadAllState();

    case LoadingUsersActionTypes.LoadAll:
      return getLoadingAllState();

    case LoadingUsersActionTypes.LoadAllSuccess:
      return getLoadedAllState();

    case LoadingUsersActionTypes.LoadAllFailure:
      return getLoadedAllErrorState(action.error);

    default:
      return state;
  }
}
