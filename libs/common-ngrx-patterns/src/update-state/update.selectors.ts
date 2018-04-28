import { createSelector } from '@ngrx/store';
import { updateAdapter } from '@reusable-parts/common-ngrx-patterns/src/update-state/update.state';

function allFn(selector) {
  return createSelector(selector, updateAdapter.getSelectors().selectAll);
}

export function allUpdatingSelectorFn(selector) {
  return createSelector(allFn(selector), updates =>
    updates.filter(update => update.updating)
  );
}

export function allUpdatingIdsSelectorFn(selector) {
  return createSelector(allUpdatingSelectorFn(selector), updates =>
    updates.map(update => update.id)
  );
}

export function isAnyUpdatingSelectorFn(selector) {
  return createSelector(
    allUpdatingSelectorFn(selector),
    updates => updates.length > 0
  );
}
