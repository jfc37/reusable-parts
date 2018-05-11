import { deleteAdapter } from '@reusable-parts/common-ngrx-patterns/src/delete-state/delete.state';
import { createSelector } from '@ngrx/store';
import { isArrayNotEmpty } from '@reusable-parts/common-functions';

function allFn(selector) {
  return createSelector(selector, deleteAdapter.getSelectors().selectAll);
}

export function allDeletingSelectorFn(selector) {
  return createSelector(allFn(selector), deletes => deletes.filter(_delete => _delete.deleting));
}

export function allDeletedSelectorFn(selector) {
  return createSelector(allFn(selector), deletes => deletes.filter(_delete => _delete.deleted));
}

export function allDeleteErroredSelectorFn(selector) {
  return createSelector(allFn(selector), deletes => deletes.filter(_delete => _delete.error));
}

export function allDeletingIdsSelectorFn(selector) {
  return createSelector(allDeletingSelectorFn(selector), deletes => deletes.map(_delete => _delete.id));
}

export function isAnyDeletingSelectorFn(selector) {
  return createSelector(allDeletingSelectorFn(selector), isArrayNotEmpty);
}

export function hasAnyDeletedSelectorFn(selector) {
  return createSelector(allDeletedSelectorFn(selector), isArrayNotEmpty);
}

export function hasAnyDeleteErroredSelectorFn(selector) {
  return createSelector(allDeleteErroredSelectorFn(selector), isArrayNotEmpty);
}
