import { BlocksActions, BlocksActionTypes } from './blocks.actions';
import { getInitialBlocksState, blockAdapter } from './blocks.state';
import { Update, EntityState } from '@ngrx/entity';
import { Block } from '../block';

export function blocksReducer(
  state = getInitialBlocksState(),
  action: BlocksActions
): EntityState<Block> {
  switch (action.type) {
    case BlocksActionTypes.Set:
      return blockAdapter.upsertMany(
        action.blocks.map(block => ({ id: block.id, changes: block })),
        state
      );

    case BlocksActionTypes.Remove:
      return blockAdapter.removeOne(action.id, state);

    default:
      return state;
  }
}
