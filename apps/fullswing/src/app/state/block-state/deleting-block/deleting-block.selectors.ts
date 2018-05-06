import { createSelector } from '@ngrx/store';
import {
  allDeletingIdsSelectorFn,
  hasAnyDeleteErroredSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';

const selector = createSelector(
  blockFeatureSelector,
  state => state.deletingBlocks
);

export const allDeletingBlockIdsSelector = allDeletingIdsSelectorFn(selector);

export const hasAnyBlockDeleteErroredSelector = hasAnyDeleteErroredSelectorFn(
  selector
);
