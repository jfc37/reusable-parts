import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  PaginationDataState,
  idToPaginationKey,
  paginationDataAdapter,
} from '@reusable-parts/common-ngrx-patterns';
import { isArrayNotEmpty } from '@reusable-parts/common-functions';

function allFn(selector) {
  return createSelector(
    selector,
    paginationDataAdapter.getSelectors().selectAll
  );
}

export function currentOrderAndDirectionSelectorFn(
  selector: MemoizedSelector<any, PaginationDataState>
) {
  return createSelector(selector, state => ({
    orderBy: state.currentOrderBy,
    sortDirection: state.currentSortDirection,
  }));
}

function allCurrentPagesSelectorFn(
  selector: MemoizedSelector<any, PaginationDataState>
) {
  return createSelector(
    allFn(selector),
    currentOrderAndDirectionSelectorFn(selector),
    (pages, { orderBy, sortDirection }) =>
      pages.filter(
        page =>
          page.key.orderBy === orderBy &&
          page.key.sortDirection === sortDirection
      )
  );
}

export function hasAnyCurrentPagesSelectorFn(
  selector: MemoizedSelector<any, PaginationDataState>
) {
  return createSelector(allCurrentPagesSelectorFn(selector), isArrayNotEmpty);
}

export function latestCurrentPageKeySelectorFn(
  selector: MemoizedSelector<any, PaginationDataState>
) {
  return createSelector(
    allCurrentPagesSelectorFn(selector),
    pages =>
      pages.sort((a, b) => (a.key.pageNumber > b.key.pageNumber ? -1 : 1))[0]
  );
}

export function dataIdsForCurrentPagesSelectorFn(
  selector: MemoizedSelector<any, PaginationDataState>
) {
  return createSelector(allCurrentPagesSelectorFn(selector), pages =>
    pages.map(page => page.ids).reduce((accum, curr) => [...accum, ...curr], [])
  );
}
