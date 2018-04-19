import { createSelector } from "@ngrx/store";
import { mealsFeatureSelector } from "../meals-feature.selectors";
import { mealAdapter } from "./meals.state";

const selector = createSelector(
  mealsFeatureSelector,
  state => state.meals
);

export const allMealsSelector = createSelector(
  selector,
  mealAdapter.getSelectors().selectAll,
);

export const hasMealsSelector = createSelector(
  allMealsSelector,
  meals => meals.length > 0
);
