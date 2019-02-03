import { createSelector } from '@ngrx/store';
import { allUpdatingIdsSelectorFn, hasAnyUpdateErroredSelectorFn } from '@reusable-parts/common-ngrx-patterns/src';
import { blockFeatureSelector } from '../block-feature.reducer';

const selector = createSelector(
  blockFeatureSelector,
  state => state.generatingBlocks,
);

export const allGeneratingBlockIdsSelector = allUpdatingIdsSelectorFn(selector);

export const hasAnyBlockGenerateErroredSelector = hasAnyUpdateErroredSelectorFn(selector);
