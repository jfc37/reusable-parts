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
  LoadingBlockPagesActionTypes,
  LoadingBlockPagesActions,
} from './loading-block-pages.actions';
import { EntityState } from '@ngrx/entity';

export function loadingBlocksReducer(
  state = loadAdapter.getInitialState(),
  action: LoadingBlockPagesActions
): EntityState<LoadStatus> {
  switch (action.type) {
    case LoadingBlockPagesActionTypes.Reset:
      return loadAdapter.getInitialState();

    case LoadingBlockPagesActionTypes.LoadRequest:
      return loadAdapter.addOne(
        getLoadingStatus(paginationKeyToId(action.key)),
        state
      );

    case LoadingBlockPagesActionTypes.LoadSuccess:
      const removed = loadAdapter.removeOne(
        paginationKeyToId(action.key),
        state
      );
      return loadAdapter.addOne(
        getLoadedStatus(paginationKeyToId(action.updatedKey)),
        removed
      );

    case LoadingBlockPagesActionTypes.LoadFailure:
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
