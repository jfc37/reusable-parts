import {
  loadAdapter,
  LoadStatus,
  getLoadingStatus,
  getLoadedStatus,
  getLoadErrorStatus,
} from '@reusable-parts/common-ngrx-patterns';
import { LoadingUsersActionTypes, LoadingUsersActions } from './loading-users.actions';
import { EntityState } from '@ngrx/entity';

export function loadingUsersReducer(
  state = loadAdapter.getInitialState(),
  action: LoadingUsersActions,
): EntityState<LoadStatus> {
  switch (action.type) {
    case LoadingUsersActionTypes.Reset:
      return loadAdapter.getInitialState();

    case LoadingUsersActionTypes.LoadAll:
      return loadAdapter.addOne(getLoadingStatus('all'), state);

    case LoadingUsersActionTypes.LoadAllSuccess:
      return loadAdapter.updateOne({ id: 'all', changes: getLoadedStatus('all') }, state);

    case LoadingUsersActionTypes.LoadAllFailure:
      return loadAdapter.updateOne(
        {
          id: 'all',
          changes: getLoadErrorStatus('all', action.error),
        },
        state,
      );

    case LoadingUsersActionTypes.Load:
      return loadAdapter.addOne(getLoadingStatus(action.id), state);

    case LoadingUsersActionTypes.LoadSuccess:
      return loadAdapter.updateOne({ id: action.id, changes: getLoadedStatus(action.id) }, state);

    case LoadingUsersActionTypes.LoadFailure:
      return loadAdapter.updateOne(
        {
          id: action.id,
          changes: getLoadErrorStatus(action.id, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
