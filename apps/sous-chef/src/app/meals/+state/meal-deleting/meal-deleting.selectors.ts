import { createSelector } from '@ngrx/store';
import { mealsFeatureSelector } from '../meals-feature.selectors';
import {
  deleteAdapter,
  getAllDeleteStatuses,
} from '@reusable-parts/common-ngrx-patterns';

const selector = createSelector(
  mealsFeatureSelector,
  state => state.mealDeleting
);

export const allMealDeleteStatusesSelector = createSelector(
  selector,
  deleteAdapter.getSelectors().selectAll
);

export const allMealDeletingIdsSelector = createSelector(
  allMealDeleteStatusesSelector,
  statuses => statuses.filter(s => s.deleting).map(s => s.id)
);
