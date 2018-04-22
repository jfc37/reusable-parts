import { createSelector } from '@ngrx/store';
import { updateAdapter } from '@reusable-parts/common-ngrx-patterns/src/update-state/update.state';

export function getAllUpdateStatuses(selector) {
  return createSelector(selector, updateAdapter.getSelectors().selectAll);
}
