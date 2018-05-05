import { createSelector } from '@ngrx/store';
import {
  isAnyLoadingSelectorFn,
  idToPaginationKey,
  allLoadedSelectorFn,
  allLoadedIdsSelectorFn,
  getLastestPageSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';

const selector = createSelector(
  blockFeatureSelector,
  state => state.loadingBlockPages
);

export const isLoadingAnyPagesSelector = isAnyLoadingSelectorFn(selector);
