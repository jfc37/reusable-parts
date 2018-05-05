import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Block } from '../block';

export const blockAdapter = createEntityAdapter<Block>({
  selectId: block => block.id,
});

export function getInitialBlocksState(): EntityState<Block> {
  return {
    ...blockAdapter.getInitialState(),
  };
}
