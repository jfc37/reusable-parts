import { Action } from '@ngrx/store';
import { mealsReducer } from './meals/meals.reducer';
import { MealState } from './meals/meals.state';
import { MealLoadingState } from './meal-loading/meal-loading.state';
import { mealLoadingReducer } from './meal-loading/meal-loading.reducer';
import { DeleteState } from '@reusable-parts/common-ngrx-patterns';
import { mealDeletingReducer } from './meal-deleting/meal-deleting.reducer';
import { CreateStatus } from '@reusable-parts/common-ngrx-patterns';
import { newMealReducer } from './new-meal/new-meal.reducer';
import { UpdateState } from '@reusable-parts/common-ngrx-patterns';
import { mealUpdatingReducer } from './meal-updating/meal-updating.reducer';

/**
 * Interface to the part of the Store containing MealsState
 * and other information related to MealsData.
 */
export interface MealsFeatureState {
  readonly meals: MealState;
  readonly mealLoading: MealLoadingState;
  readonly mealDeleting: DeleteState;
  readonly mealUpdating: UpdateState;
  readonly newMeal: CreateStatus;
}

export const mealsFeatureReducer = {
  meals: mealsReducer,
  mealLoading: mealLoadingReducer,
  mealDeleting: mealDeletingReducer,
  mealUpdating: mealUpdatingReducer,
  newMeal: newMealReducer,
};
