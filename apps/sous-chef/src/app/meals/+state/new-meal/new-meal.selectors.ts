import { createSelector } from '@ngrx/store';
import { mealsFeatureSelector } from '../meals-feature.selectors';

const selector = createSelector(mealsFeatureSelector, state => state.newMeal);

export const isCreatingMealSelector = createSelector(
  selector,
  state => state.creating
);

export const hasCreatedMealSelector = createSelector(
  selector,
  state => state.created
);
