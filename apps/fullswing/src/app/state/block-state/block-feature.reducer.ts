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

export interface BlockFeatureState {
  readonly creatingBlock: CreateStatus;

  readonly loadingBlocks: EntityState<LoadStatus>;
}

export const blockFeatureReducer = {
  creatingBlock: creatingBlockReducer,

  loadingBlocks: loadingBlocksReducer,
};

export function getInitialBlockFeatureState(): BlockFeatureState {
  return {
    creatingBlock: getDefaultCreateStatus(),

    loadingBlocks: getInitialLoadState(),
  };
}

export const blockFeatureSelector = createFeatureSelector<BlockFeatureState>(
  'blockFeature'
);
