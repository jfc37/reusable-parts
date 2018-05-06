import { EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import {
  CreateStatus,
  LoadStatus,
  PageState,
  SortDirection,
  UpdateStatus,
  getDefaultCreateStatus,
  getInitialLoadState,
  getInitialPageState,
  getInitialUpdateState,
  DeleteStatus,
  getInitialDeleteState,
} from '@reusable-parts/common-ngrx-patterns';
import { Block } from './block';
import { blockPagesReducer } from './block-pages/block-pages.reducer';
import { blocksReducer } from './blocks/blocks.reducer';
import { getInitialBlocksState } from './blocks/blocks.state';
import { creatingBlockReducer } from './creating-block/creating-block.reducer';
import { generatingBlocksReducer } from './generating-block/generating-block.reducer';
import { loadingBlocksReducer } from './loading-block-pages/loading-block-pages.reducer';
import { deletingBlocksReducer } from './deleting-block/deleting-block.reducer';

export interface BlockFeatureState {
  readonly creatingBlock: CreateStatus;
  readonly generatingBlocks: EntityState<UpdateStatus>;
  readonly deletingBlocks: EntityState<DeleteStatus>;

  readonly blocks: EntityState<Block>;

  readonly loadingBlockPages: EntityState<LoadStatus>;
  readonly blockPages: PageState;
}

export const blockFeatureReducer = {
  creatingBlock: creatingBlockReducer,
  generatingBlocks: generatingBlocksReducer,
  deletingBlocks: deletingBlocksReducer,

  blocks: blocksReducer,

  loadingBlockPages: loadingBlocksReducer,
  blockPages: blockPagesReducer,
};

export function getInitialBlockFeatureState(): BlockFeatureState {
  return {
    creatingBlock: getDefaultCreateStatus(),
    generatingBlocks: getInitialUpdateState(),
    deletingBlocks: getInitialDeleteState(),

    blocks: getInitialBlocksState(),

    loadingBlockPages: getInitialLoadState(),
    blockPages: getInitialPageState('startDate', SortDirection.Descending),
  };
}

export const blockFeatureSelector = createFeatureSelector<BlockFeatureState>(
  'blockFeature'
);
