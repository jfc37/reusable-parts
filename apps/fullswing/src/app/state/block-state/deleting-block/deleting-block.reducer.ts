import { EntityState } from '@ngrx/entity';
import {
  DeleteStatus,
  deleteAdapter,
  getDeletedStatus,
  getDeletingStatus,
  getDeleteErrorStatus,
} from '@reusable-parts/common-ngrx-patterns/src';
import { DeletingBlockActionTypes, DeletingBlockActions } from './deleting-block.actions';

export function deletingBlocksReducer(
  state = deleteAdapter.getInitialState(),
  action: DeletingBlockActions,
): EntityState<DeleteStatus> {
  switch (action.type) {
    case DeletingBlockActionTypes.Reset:
      return deleteAdapter.getInitialState();

    case DeletingBlockActionTypes.DeleteRequest:
      return deleteAdapter.upsertOne({ id: action.id, changes: getDeletingStatus(action.id) }, state);

    case DeletingBlockActionTypes.DeleteSuccess:
      return deleteAdapter.updateOne(
        {
          id: action.id,
          changes: getDeletedStatus(action.id),
        },
        state,
      );

    case DeletingBlockActionTypes.DeleteFailure:
      return deleteAdapter.updateOne(
        {
          id: action.id,
          changes: getDeleteErrorStatus(action.id, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
