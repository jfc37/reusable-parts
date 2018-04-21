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

export const allFoodSelector = createSelector(
  allMealsSelector,
  meals => meals.map(meal => (meal.ingredients || []).map(ingredient => ingredient.food))
    .reduce((arr, curr) => arr.concat(curr), [])
);

export const hasNoMealsSelector = createSelector(
  allMealsSelector,
  meals => meals.length === 0
);
