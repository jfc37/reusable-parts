import { createSelector } from '@ngrx/store';
import { loadAdapter } from '@reusable-parts/common-ngrx-patterns/src/load-state/load.state';

function allFn(selector) {
  return createSelector(selector, loadAdapter.getSelectors().selectAll);
}

export function allLoadingSelectorFn(selector) {
  return createSelector(allFn(selector), loads =>
    loads.filter(load => load.loading)
  );
}

export function allLoadedSelectorFn(selector) {
  return createSelector(allFn(selector), loads =>
    loads.filter(load => load.loaded)
  );
}

export function allLoadErroredSelectorFn(selector) {
  return createSelector(allFn(selector), loads =>
    loads.filter(load => load.error)
  );
}

export function allLoadingIdsSelectorFn(selector) {
  return createSelector(allLoadingSelectorFn(selector), loads =>
    loads.map(load => load.id)
  );
}

export function allLoadErroredIdsSelectorFn(selector) {
  return createSelector(allLoadErroredSelectorFn(selector), loads =>
    loads.map(load => load.id)
  );
}

export function isLoadingIdSelectorFn(selector, id) {
  return createSelector(allLoadingIdsSelectorFn(selector), arrayIncludesFn(id));
}

export function isAnyLoadingSelectorFn(selector) {
  return createSelector(allLoadingSelectorFn(selector), isNonEmpty);
}

export function hasAnyLoadedSelectorFn(selector) {
  return createSelector(allLoadedSelectorFn(selector), isNonEmpty);
}

export function hasLoadedIdSelectorFn(selector, id) {
  return createSelector(allLoadedSelectorFn(selector), arrayIncludesFn(id));
}

export function hasAnyLoadErroredSelectorFn(selector) {
  return createSelector(allLoadErroredSelectorFn(selector), isNonEmpty);
}

export function hasErroredLoadingIdSelectorFn(selector, id) {
  return createSelector(
    allLoadErroredIdsSelectorFn(selector),
    arrayIncludesFn(id)
  );
}

function isNonEmpty(arr: any[]) {
  return arr.length > 0;
}

function arrayIncludesFn(value): (array: any[]) => boolean {
  return arr => arr.includes(value);
}

export function shouldLoadIdSelectorFn(selector, id) {
  return createSelector(
    hasLoadedIdSelectorFn(selector, id),
    isLoadingIdSelectorFn(selector, id),
    allFalsy
  );
}

function allFalsy(...args: boolean[]) {
  return args.every(arg => !arg);
}
