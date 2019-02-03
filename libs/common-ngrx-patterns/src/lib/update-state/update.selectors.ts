import { createSelector } from '@ngrx/store';
import { updateAdapter } from '@reusable-parts/common-ngrx-patterns/src/lib/update-state/update.state';
import { isArrayNotEmpty } from '@reusable-parts/common-functions/src';

function allFn(selector) {
  return createSelector(
    selector,
    updateAdapter.getSelectors().selectAll,
  );
}

export function allUpdatingSelectorFn(selector) {
  return createSelector(
    allFn(selector),
    updates => updates.filter(update => update.updating),
  );
}

export function allUpdatedSelectorFn(selector) {
  return createSelector(
    allFn(selector),
    updates => updates.filter(update => update.updated),
  );
}

export function allUpdateErroredSelectorFn(selector) {
  return createSelector(
    allFn(selector),
    updates => updates.filter(update => update.error),
  );
}

export function allUpdatingIdsSelectorFn(selector) {
  return createSelector(
    allUpdatingSelectorFn(selector),
    updates => updates.map(update => update.id),
  );
}

export function isAnyUpdatingSelectorFn(selector) {
  return createSelector(
    allUpdatingSelectorFn(selector),
    isArrayNotEmpty,
  );
}

export function hasAnyUpdatedSelectorFn(selector) {
  return createSelector(
    allUpdatedSelectorFn(selector),
    isArrayNotEmpty,
  );
}

export function hasAnyUpdateErroredSelectorFn(selector) {
  return createSelector(
    allUpdateErroredSelectorFn(selector),
    isArrayNotEmpty,
  );
}
