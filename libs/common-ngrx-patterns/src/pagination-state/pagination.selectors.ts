import { createSelector } from '@ngrx/store';
import {
  idToPaginationKey,
  allLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

function getAllLoadedBlockPageIdsSelectorFn(selector) {
  return allLoadedIdsSelectorFn(selector);
}

function getAllLoadedPaginationKeysSelectorFn(selector) {
  return createSelector(getAllLoadedBlockPageIdsSelectorFn(selector), ids =>
    ids
      .map(idToPaginationKey)
      .sort((a, b) => (a.pageNumber > b.pageNumber ? -1 : 1))
  );
}

export function getLastestPageSelectorFn(selector) {
  return createSelector(
    getAllLoadedPaginationKeysSelectorFn(selector),
    pages => pages[0]
  );
}
