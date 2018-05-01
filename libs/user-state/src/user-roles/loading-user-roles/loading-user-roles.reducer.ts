import {
  loadAdapter,
  LoadStatus,
  getLoadingStatus,
  getLoadedStatus,
  getLoadErrorStatus,
} from '@reusable-parts/common-ngrx-patterns';
import {
  LoadingUserRolesActionTypes,
  LoadingUserRolesActions,
} from './loading-user-roles.actions';
import { EntityState } from '@ngrx/entity';

export function loadingUserRolesReducer(
  state = loadAdapter.getInitialState(),
  action: LoadingUserRolesActions
): EntityState<LoadStatus> {
  switch (action.type) {
    case LoadingUserRolesActionTypes.Reset:
      return loadAdapter.getInitialState();

    case LoadingUserRolesActionTypes.LoadAll:
      return loadAdapter.addOne(getLoadingStatus('all'), state);

    case LoadingUserRolesActionTypes.LoadAllSuccess:
      return loadAdapter.updateOne(
        { id: 'all', changes: getLoadedStatus('all') },
        state
      );

    case LoadingUserRolesActionTypes.LoadAllFailure:
      return loadAdapter.updateOne(
        {
          id: 'all',
          changes: getLoadErrorStatus('all', action.error),
        },
        state
      );

    case LoadingUserRolesActionTypes.LoadByRole:
      return loadAdapter.addOne(getLoadingStatus(action.role), state);

    case LoadingUserRolesActionTypes.LoadByRoleSuccess:
      return loadAdapter.updateOne(
        { id: action.role, changes: getLoadedStatus(action.role) },
        state
      );

    case LoadingUserRolesActionTypes.LoadByRoleFailure:
      return loadAdapter.updateOne(
        {
          id: action.role,
          changes: getLoadErrorStatus(action.role, action.error),
        },
        state
      );

    default:
      return state;
  }
}
