import { createSelector } from "@ngrx/store";
import { allMealsSelector } from "../../+state/meals/meals.selectors";
import { MealCardModel } from "./meal-card.component.model";
import { allMealDeletingIdsSelector } from "../../+state/meal-deleting/meal-deleting.selectors";
import { allMealUpdatingIdsSelector } from "../../+state/meal-updating/meail-updating.selectors";
import { Meal } from "../../+state/meals/meals.state";

export const allMealCardModelsSelector = createSelector(
  allMealsSelector,
  allMealDeletingIdsSelector,
  allMealUpdatingIdsSelector,
  (meals, deletingIds, updatingIds) => meals.map(meal => ({
    id: meal.id,

    title: meal.name,
    link: meal.link,
    ingredients: meal.ingredients || [],

    ingredientsTitle: getIngredientsTitle(meal),

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
