import { MemoizedSelector, createSelector } from '@ngrx/store';
import { isArrayNotEmpty } from '@reusable-parts/common-functions';
import { pageAdapter } from '@reusable-parts/common-ngrx-patterns/src/page-state/page-functions';
import { PageState } from '@reusable-parts/common-ngrx-patterns/src/page-state/page.state';

function allFn(selector) {
  return createSelector(selector, pageAdapter.getSelectors().selectAll);
}

export function allPagesSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return allFn(selector);
}

export function currentOrderAndDirectionSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(selector, state => ({
    orderBy: state.currentOrderBy,
    sortDirection: state.currentSortDirection,
  }));
}

function allCurrentPagesSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(
    allFn(selector),
    currentOrderAndDirectionSelectorFn(selector),
    (pages, { orderBy, sortDirection }) =>
      pages.filter(page => page.key.orderBy === orderBy && page.key.sortDirection === sortDirection),
  );
}

export function hasReachedFinalPageSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(allCurrentPagesSelectorFn(selector), pages => pages.some(page => page.key.isFinalPage));
}

export function hasMorePagesToRetrieveSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(hasReachedFinalPageSelectorFn(selector), hasFinalPage => !hasFinalPage);
}

export function hasAnyCurrentPagesSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(allCurrentPagesSelectorFn(selector), isArrayNotEmpty);
}

export function latestCurrentPageKeySelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(
    allCurrentPagesSelectorFn(selector),
    pages => pages.sort((a, b) => (a.key.pageNumber > b.key.pageNumber ? -1 : 1))[0],
  );
}

export function dataIdsForCurrentPagesSelectorFn(selector: MemoizedSelector<any, PageState>) {
  return createSelector(allCurrentPagesSelectorFn(selector), pages =>
    pages.map(page => page.ids).reduce((accum, curr) => [...accum, ...curr], []),
  );
}
