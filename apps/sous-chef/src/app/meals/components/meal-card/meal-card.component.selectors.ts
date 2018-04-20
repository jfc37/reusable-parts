import { createSelector } from "@ngrx/store";
import { allMealsSelector } from "../../+state/meals/meals.selectors";
import { MealCardModel } from "./meal-card.component.model";
import { allMealDeletingIdsSelector } from "../../+state/meal-deleting/meal-deleting.selectors";

export const allMealCardModelsSelector = createSelector(
  allMealsSelector,
  allMealDeletingIdsSelector,
  (meals, deletingIds) => meals.map(meal => ({
    id: meal.id,
    title: meal.name,
    deleting: deletingIds.includes(meal.id),
  } as MealCardModel))
)
