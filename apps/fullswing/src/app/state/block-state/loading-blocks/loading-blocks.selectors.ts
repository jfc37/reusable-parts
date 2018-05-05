import { createSelector } from '@ngrx/store';
import {
  isAnyLoadingSelectorFn,
  idToPaginationKey,
  allLoadedSelectorFn,
  allLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';
import { getLastestPageSelectorFn } from '@reusable-parts/common-ngrx-patterns/src/pagination-state/pagination.selectors';

const selector = createSelector(
  blockFeatureSelector,
  state => state.loadingBlocks
);

export const hasFirstPageSelector = createSelector(
  selector,
  state => state.ids.length > 0
);

export const getLastestBlockPageSelector = getLastestPageSelectorFn(selector);

export const isLoadingAnyPagesSelector = isAnyLoadingSelectorFn(selector);
