import { GeneratingBlockActionTypes, GeneratingBlockActions } from './generating-block.actions';
import {
  getInitialUpdateState,
  UpdateStatus,
  updateAdapter,
  getUpdatingStatus,
  getUpdatedStatus,
  getUpdateErrorStatus,
} from '@reusable-parts/common-ngrx-patterns/src';
import { EntityState } from '@ngrx/entity';

export function generatingBlocksReducer(
  state = updateAdapter.getInitialState(),
  action: GeneratingBlockActions,
): EntityState<UpdateStatus> {
  switch (action.type) {
    case GeneratingBlockActionTypes.Reset:
      return updateAdapter.getInitialState();

    case GeneratingBlockActionTypes.GenerateRequest:
      return updateAdapter.upsertOne(getUpdatingStatus(action.id), state);

    case GeneratingBlockActionTypes.GenerateSuccess:
      return updateAdapter.updateOne(
        {
          id: action.id,
          changes: getUpdatedStatus(action.id),
        },
        state,
      );

    case GeneratingBlockActionTypes.GenerateFailure:
      return updateAdapter.updateOne(
        {
          id: action.id,
          changes: getUpdateErrorStatus(action.id, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
