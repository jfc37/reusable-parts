import { createSelector } from "@ngrx/store";
import { mealsFeatureSelector } from "../meals-feature.selectors";
import { updateAdapter } from "@reusable-parts/common-ngrx-patterns/src/update-state/update.state";
import { getAllUpdateStatuses } from "@reusable-parts/common-ngrx-patterns/src/update-state/update.selectors";

const selector = createSelector(
  mealsFeatureSelector,
  state => state.mealUpdating
);

export const allMealUpdateStatusesSelector = createSelector(
  selector,
  updateAdapter.getSelectors().selectAll,
);

export const allMealUpdatingIdsSelector = createSelector(
  allMealUpdateStatusesSelector,
  statuses => statuses.filter(s => s.updating).map(s => s.id),
);
