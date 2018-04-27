import {
  LoadAllState,
  getDefaultLoadAllState,
  getLoadedAllErrorState,
  getLoadedAllState,
  getLoadingAllState,
} from '@reusable-parts/common-ngrx-patterns';
import {
  LoadingUserRolesActionTypes,
  LoadingUserRolesActions,
} from './loading-user-roles.actions';

export function loadingUserRolesReducer(
  state = getDefaultLoadAllState(),
  action: LoadingUserRolesActions
): LoadAllState {
  switch (action.type) {
    case LoadingUserRolesActionTypes.Reset:
      return getDefaultLoadAllState();

    case LoadingUserRolesActionTypes.LoadAll:
      return getLoadingAllState();

    case LoadingUserRolesActionTypes.LoadAllSuccess:
      return getLoadedAllState();

    case LoadingUserRolesActionTypes.LoadAllFailure:
      return getLoadedAllErrorState(action.error);

    default:
      return state;
  }
}
