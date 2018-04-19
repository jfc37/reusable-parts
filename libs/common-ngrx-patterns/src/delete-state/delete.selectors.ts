import { createSelector } from "@ngrx/store";
import { deleteAdapter } from "@reusable-parts/common-ngrx-patterns/src/delete-state/delete.state";

export function getAllDeleteStatuses(selector) {
  return createSelector(
    selector,
    deleteAdapter.getSelectors().selectAll,
  );
}
