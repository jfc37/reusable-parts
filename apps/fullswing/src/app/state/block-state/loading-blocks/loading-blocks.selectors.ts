import { createSelector } from '@ngrx/store';
import {
  isAnyLoadingSelectorFn,
  idToPaginationKey,
  allLoadedSelectorFn,
  allLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';
import { blockFeatureSelector } from '../block-feature.reducer';

const selector = createSelector(
  blockFeatureSelector,
  state => state.loadingBlocks
);

export const hasFirstPageSelector = createSelector(
  selector,
  state => state.ids.length > 0
);

export const getAllLoadedBlockPageIdsSelector = allLoadedIdsSelectorFn(
  selector
);

export const getAllLoadedBlockPaginationKeysSelector = createSelector(
  getAllLoadedBlockPageIdsSelector,
  ids =>
    ids
      .map(idToPaginationKey)
      .sort((a, b) => (a.pageNumber > b.pageNumber ? 1 : -1))
);

export const getLastestPageSelector = createSelector(
  getAllLoadedBlockPaginationKeysSelector,
  pages => pages[0]
);

export const isLoadingAnyPagesSelector = isAnyLoadingSelectorFn(selector);
