import { createSelector } from "@ngrx/store";
import { allMealsSelector } from "../../+state/meals/meals.selectors";
import { MealSummaryCardModel } from "./meal-summary-card.component.model";

export const allMealSummaryCardModelsSelector = createSelector(
  allMealsSelector,
  meals => meals.map(meal => ({
    id: meal.id,
    title: meal.name,
    linkUrl: meal.id,
    imageUrl: '/assets/images/beach.jpg',
    deleting: true,
  } as MealSummaryCardModel))
)
