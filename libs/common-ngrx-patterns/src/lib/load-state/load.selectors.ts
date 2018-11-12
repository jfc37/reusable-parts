import { createSelector } from '@ngrx/store';
import { loadAdapter } from '@reusable-parts/common-ngrx-patterns/src/lib/load-state/load.state';
import { isArrayNotEmpty, areAllArgumentsFalsy, isArrayEmpty } from '@reusable-parts/common-functions/src';

function allFn(selector) {
  return createSelector(
    selector,
    loadAdapter.getSelectors().selectAll,
  );
}

export function allLoadingSelectorFn(selector) {
  return createSelector(
    allFn(selector),
    loads => loads.filter(load => load.loading),
  );
}

export function allLoadedSelectorFn(selector) {
  return createSelector(
    allFn(selector),
    loads => loads.filter(load => load.loaded),
  );
}

export function allLoadingOrLoadedSelectorFn(selector) {
  return createSelector(
    allLoadingSelectorFn(selector),
    allLoadedSelectorFn(selector),
    (loadingIds, loadedIds) => [...loadingIds, ...loadedIds],
  );
}

export function allLoadingOrLoadedIdsSelectorFn(selector) {
  return createSelector(
    allLoadingOrLoadedSelectorFn(selector),
    loads => loads.map(load => load.id),
  );
}

export function allLoadErroredSelectorFn(selector) {
  return createSelector(
    allFn(selector),
    loads => loads.filter(load => load.error),
  );
}

export function allLoadingIdsSelectorFn(selector) {
  return createSelector(
    allLoadingSelectorFn(selector),
    loads => loads.map(load => load.id),
  );
}

export function allLoadedIdsSelectorFn(selector) {
  return createSelector(
    allLoadedSelectorFn(selector),
    loads => loads.map(load => load.id),
  );
}

export function allLoadErroredIdsSelectorFn(selector) {
  return createSelector(
    allLoadErroredSelectorFn(selector),
    loads => loads.map(load => load.id),
  );
}

export function isLoadingIdSelectorFn(selector, id) {
  return createSelector(
    allLoadingIdsSelectorFn(selector),
    arrayIncludesFn(id),
  );
}

export function isAnyLoadingSelectorFn(selector) {
  return createSelector(
    allLoadingSelectorFn(selector),
    isArrayNotEmpty,
  );
}

export function hasAnyLoadedSelectorFn(selector) {
  return createSelector(
    allLoadedSelectorFn(selector),
    isArrayNotEmpty,
  );
}

export function hasNotLoadedAnySelectorFn(selector) {
  return createSelector(
    allLoadedSelectorFn(selector),
    isArrayEmpty,
  );
}

export function hasLoadedIdSelectorFn(selector, id) {
  return createSelector(
    allLoadedSelectorFn(selector),
    arrayIncludesFn(id),
  );
}

export function hasAnyLoadErroredSelectorFn(selector) {
  return createSelector(
    allLoadErroredSelectorFn(selector),
    isArrayNotEmpty,
  );
}

export function hasErroredLoadingIdSelectorFn(selector, id) {
  return createSelector(
    allLoadErroredIdsSelectorFn(selector),
    arrayIncludesFn(id),
  );
}

function arrayIncludesFn(value): (array: any[]) => boolean {
  return arr => arr.includes(value);
}

export function shouldLoadIdSelectorFn(selector, id) {
  return createSelector(
    hasLoadedIdSelectorFn(selector, id),
    isLoadingIdSelectorFn(selector, id),
    areAllArgumentsFalsy,
  );
}
