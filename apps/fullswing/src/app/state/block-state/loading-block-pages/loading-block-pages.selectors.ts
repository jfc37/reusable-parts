import { createSelector } from '@ngrx/store';
import {
  isAnyLoadingSelectorFn,
  idToPageKey,
  allLoadedSelectorFn,
  allLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';

const selector = createSelector(
  blockFeatureSelector,
  state => state.loadingBlockPages
);

export const isLoadingAnyPagesSelector = isAnyLoadingSelectorFn(selector);
