import { EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import {
  CreateStatus,
  LoadStatus,
  getDefaultCreateStatus,
  getInitialLoadState,
} from '@reusable-parts/common-ngrx-patterns';
import { creatingBlockReducer } from './creating-block/creating-block.reducer';
import { loadingBlocksReducer } from './loading-blocks/loading-blocks.reducer';
import { Block } from './block';
import { blocksReducer } from './blocks/blocks.reducer';
import { getInitialBlocksState } from './blocks/blocks.state';

export interface BlockFeatureState {
  readonly creatingBlock: CreateStatus;

  readonly blocks: EntityState<Block>;
  readonly loadingBlocks: EntityState<LoadStatus>;
}

export const blockFeatureReducer = {
  creatingBlock: creatingBlockReducer,

  blocks: blocksReducer,
  loadingBlocks: loadingBlocksReducer,
};

export function getInitialBlockFeatureState(): BlockFeatureState {
  return {
    creatingBlock: getDefaultCreateStatus(),

    blocks: getInitialBlocksState(),
    loadingBlocks: getInitialLoadState(),
  };
}

export const blockFeatureSelector = createFeatureSelector<BlockFeatureState>(
  'blockFeature'
);
