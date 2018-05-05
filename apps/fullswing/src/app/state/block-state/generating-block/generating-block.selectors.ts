import { createSelector } from '@ngrx/store';
import { allUpdatingIdsSelectorFn } from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';

const selector = createSelector(
  blockFeatureSelector,
  state => state.generatingBlocks
);

export const allGeneratingBlockIdsSelector = allUpdatingIdsSelectorFn(selector);
