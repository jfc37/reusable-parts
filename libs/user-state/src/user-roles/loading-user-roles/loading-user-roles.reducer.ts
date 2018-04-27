import { Action } from '@ngrx/store';
import {
  getDefaultLoadAllState,
  LoadAllState,
  getLoadingAllState,
  getLoadedAllState,
  getLoadedAllErrorState,
} from '@reusable-parts/common-ngrx-patterns';
import {
  LoadingUserRolesActions,
  LoadingUserRolesActionTypes,
} from './loading-user-roles.actions';

export function loadingUserRolesReducer(
  state = getDefaultLoadAllState(),
  action: LoadingUserRolesActions
): LoadAllState {
  switch (action.type) {
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
