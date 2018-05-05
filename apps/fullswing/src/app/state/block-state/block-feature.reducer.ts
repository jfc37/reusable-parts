import { EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import {
  CreateStatus,
  LoadStatus,
  getDefaultCreateStatus,
  getInitialLoadState,
  PaginationDataState,
  getInitialPaginationDataState,
} from '@reusable-parts/common-ngrx-patterns';
import { creatingBlockReducer } from './creating-block/creating-block.reducer';
import { loadingBlocksReducer } from './loading-block-pages/loading-block-pages.reducer';
import { Block } from './block';
import { blocksReducer } from './blocks/blocks.reducer';
import { getInitialBlocksState } from './blocks/blocks.state';
import { blockPagesReducer } from './block-pages/block-pages.reducer';

export interface BlockFeatureState {
  readonly creatingBlock: CreateStatus;

  readonly blocks: EntityState<Block>;

  readonly loadingBlockPages: EntityState<LoadStatus>;
  readonly blockPages: PaginationDataState;
}

export const blockFeatureReducer = {
  creatingBlock: creatingBlockReducer,

  blocks: blocksReducer,
  loadingBlockPages: loadingBlocksReducer,
  blockPages: blockPagesReducer,
};

export function getInitialBlockFeatureState(): BlockFeatureState {
  return {
    creatingBlock: getDefaultCreateStatus(),

    blocks: getInitialBlocksState(),
    loadingBlockPages: getInitialLoadState(),
    blockPages: getInitialPaginationDataState('name'),
  };
}

export const blockFeatureSelector = createFeatureSelector<BlockFeatureState>(
  'blockFeature'
);
