import { createSelector } from '@ngrx/store';
import {
  idToPaginationKey,
  allLoadedIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns';

function getAllLoadedPageIdsSelectorFn(selector) {
  return allLoadedIdsSelectorFn(selector);
}

function getAllLoadedPaginationKeysSelectorFn(selector) {
  return createSelector(getAllLoadedPageIdsSelectorFn(selector), ids =>
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
