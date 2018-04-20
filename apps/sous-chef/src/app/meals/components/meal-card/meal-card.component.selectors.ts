import { createSelector } from "@ngrx/store";
import { allMealsSelector } from "../../+state/meals/meals.selectors";
import { MealCardModel } from "./meal-card.component.model";
import { allMealDeletingIdsSelector } from "../../+state/meal-deleting/meal-deleting.selectors";
import { allMealUpdatingIdsSelector } from "../../+state/meal-updating/meail-updating.selectors";

export const allMealCardModelsSelector = createSelector(
  allMealsSelector,
  allMealDeletingIdsSelector,
  allMealUpdatingIdsSelector,
  (meals, deletingIds, updatingIds) => meals.map(meal => ({
    id: meal.id,
    title: meal.name,
    link: meal.link,
    deleting: deletingIds.includes(meal.id),
    updatingLink: updatingIds.includes(meal.id),
  } as MealCardModel))
)
