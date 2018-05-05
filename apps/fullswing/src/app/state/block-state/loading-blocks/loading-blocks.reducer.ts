import {
  loadAdapter,
  LoadStatus,
  getLoadingStatus,
  getLoadedStatus,
  getLoadErrorStatus,
  paginationKeyToId,
  PaginationKey,
} from '@reusable-parts/common-ngrx-patterns';
import {
  LoadingBlocksActionTypes,
  LoadingBlocksActions,
} from './loading-blocks.actions';
import { EntityState } from '@ngrx/entity';

export function loadingBlocksReducer(
  state = loadAdapter.getInitialState(),
  action: LoadingBlocksActions
): EntityState<LoadStatus> {
  switch (action.type) {
    case LoadingBlocksActionTypes.Reset:
      return loadAdapter.getInitialState();

    case LoadingBlocksActionTypes.LoadRequest:
      return loadAdapter.addOne(
        getLoadingStatus(paginationKeyToId(action.key)),
        state
      );

    case LoadingBlocksActionTypes.LoadSuccess:
      const removed = loadAdapter.removeOne(
        paginationKeyToId(action.key),
        state
      );
      return loadAdapter.addOne(
        getLoadedStatus(paginationKeyToId(action.updatedKey)),
        removed
      );

    case LoadingBlocksActionTypes.LoadFailure:
      return loadAdapter.updateOne(
        {
          id: paginationKeyToId(action.key),
          changes: getLoadErrorStatus(
            paginationKeyToId(action.key),
            action.error
          ),
        },
        state
      );

    default:
      return state;
  }
}
