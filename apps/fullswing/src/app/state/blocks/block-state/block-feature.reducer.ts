import { createFeatureSelector } from '@ngrx/store';
import {
  CreateStatus,
  getDefaultCreateStatus,
} from '@reusable-parts/common-ngrx-patterns';
import { creatingBlockReducer } from './creating-block/creating-block.reducer';

export interface BlockFeatureState {
  readonly creatingBlock: CreateStatus;
}

export const blockFeatureReducer = {
  creatingBlock: creatingBlockReducer,
};

export function getInitialBlockFeatureState(): BlockFeatureState {
  return {
    creatingBlock: getDefaultCreateStatus(),
  };
}

export const blockFeatureSelector = createFeatureSelector<BlockFeatureState>(
  'blockFeature'
);
