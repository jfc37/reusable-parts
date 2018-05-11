import {
  loadAdapter,
  LoadStatus,
  getLoadingStatus,
  getLoadedStatus,
  getLoadErrorStatus,
  pageKeyToId,
  PageKey,
} from '@reusable-parts/common-ngrx-patterns';
import { LoadingBlockPagesActionTypes, LoadingBlockPagesActions } from './loading-block-pages.actions';
import { EntityState } from '@ngrx/entity';

export function loadingBlocksReducer(
  state = loadAdapter.getInitialState(),
  action: LoadingBlockPagesActions,
): EntityState<LoadStatus> {
  switch (action.type) {
    case LoadingBlockPagesActionTypes.Reset:
      return loadAdapter.getInitialState();

    case LoadingBlockPagesActionTypes.LoadRequest:
      return loadAdapter.addOne(getLoadingStatus(pageKeyToId(action.key)), state);

    case LoadingBlockPagesActionTypes.LoadSuccess:
      const removed = loadAdapter.removeOne(pageKeyToId(action.key), state);
      return loadAdapter.addOne(getLoadedStatus(pageKeyToId(action.updatedKey)), removed);

    case LoadingBlockPagesActionTypes.LoadFailure:
      return loadAdapter.updateOne(
        {
          id: pageKeyToId(action.key),
          changes: getLoadErrorStatus(pageKeyToId(action.key), action.error),
        },
        state,
      );

    default:
      return state;
  }
}
