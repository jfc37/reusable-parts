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

export const currentSlugSelector = createSelector(
  selector,
  state => state.currentSlug,
);

export const allFoodSelector = createSelector(
  allMealsSelector,
  meals => meals.map(meal => (meal.ingredients || []).map(ingredient => ingredient.food))
    .reduce((arr, curr) => arr.concat(curr), [])
);

export const allPreparationStepSelector = createSelector(
  allMealsSelector,
  meals => meals.map(meal => meal.preparationSteps || [])
    .reduce((arr, curr) => arr.concat(curr), [])
);

export const allCookingStepSelector = createSelector(
  allMealsSelector,
  meals => meals.map(meal => meal.cookingSteps || [])
    .reduce((arr, curr) => arr.concat(curr), [])
);

export const hasNoMealsSelector = createSelector(
  allMealsSelector,
  meals => meals.length === 0
);

export const currentMealSelector = createSelector(
  currentSlugSelector,
  allMealsSelector,
  (slug, meals) => meals.find(meal => meal.slug === slug)
);

export const currentMealNameSelector = createSelector(
  currentMealSelector,
  currentMeal => currentMeal && currentMeal.name
);

export const currentMealPrepWorkSelector = createSelector(
  currentMealSelector,
  currentMeal => currentMeal && currentMeal.preparationSteps
);

export const currentMealCookingStepsSelector = createSelector(
  currentMealSelector,
  currentMeal => currentMeal && currentMeal.cookingSteps
);
