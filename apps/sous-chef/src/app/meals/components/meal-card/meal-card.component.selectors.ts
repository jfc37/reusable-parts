import { createSelector } from "@ngrx/store";
import { allMealsSelector, allFoodSelector } from "../../+state/meals/meals.selectors";
import { MealCardModel } from "./meal-card.component.model";
import { allMealDeletingIdsSelector } from "../../+state/meal-deleting/meal-deleting.selectors";
import { allMealUpdatingIdsSelector } from "../../+state/meal-updating/meail-updating.selectors";
import { Meal } from "../../+state/meals/meals.state";

export const allMealCardModelsSelector = createSelector(
  allMealsSelector,
  allMealDeletingIdsSelector,
  allMealUpdatingIdsSelector,
  allFoodSelector,
  (meals, deletingIds, updatingIds, foodOptions) => meals.map(meal => ({
    id: meal.id,

    title: meal.name,
    link: meal.link,
    ingredients: meal.ingredients || [],
    preparationSteps: meal.preparationSteps || [],
    cookingSteps: meal.cookingSteps || [],

    ingredientsTitle: getIngredientsTitle(meal),
    preparationTitle: getPreparationTitle(meal),
    cookingStepsTitle: getCookingStepsTitle(meal),

    foodOptions,

    deleting: deletingIds.includes(meal.id),
    updating: updatingIds.includes(meal.id),
  } as MealCardModel))
)

function getIngredientsTitle(meal: Meal): string {
  if (!meal.ingredients || meal.ingredients.length === 0) {
    return 'No ingredients';
  }

  return meal.ingredients.length === 1
    ? '1 ingredient'
    : `${meal.ingredients.length} ingredients`;
}

function getPreparationTitle(meal: Meal): string {
  if (!meal.preparationSteps || meal.preparationSteps.length === 0) {
    return 'No preparation';
  }

  return meal.preparationSteps.length === 1
    ? '1 preparation step'
    : `${meal.preparationSteps.length} preparation steps`;
}

function getCookingStepsTitle(meal: Meal): string {
  if (!meal.cookingSteps || meal.cookingSteps.length === 0) {
    return 'No cooking steps';
  }

  return meal.cookingSteps.length === 1
    ? '1 cooking step'
    : `${meal.cookingSteps.length} cooking steps`;
}
