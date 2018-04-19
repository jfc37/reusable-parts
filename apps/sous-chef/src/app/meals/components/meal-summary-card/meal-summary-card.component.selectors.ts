import { createSelector } from "@ngrx/store";
import { allMealsSelector } from "../../+state/meals/meals.selectors";
import { MealSummaryCardModel } from "./meal-summary-card.component.model";
import { allMealDeletingIdsSelector } from "../../+state/meal-deleting/meal-deleting.selectors";

export const allMealSummaryCardModelsSelector = createSelector(
  allMealsSelector,
  allMealDeletingIdsSelector,
  (meals, deletingIds) => meals.map(meal => ({
    id: meal.id,
    title: meal.name,
    linkUrl: meal.id,
    imageUrl: '/assets/images/beach.jpg',
    deleting: deletingIds.includes(meal.id),
  } as MealSummaryCardModel))
)
