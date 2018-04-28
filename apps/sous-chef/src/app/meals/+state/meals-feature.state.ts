import { Action } from '@ngrx/store';
import { mealsReducer } from './meals/meals.reducer';
import { MealState } from './meals/meals.state';
import { MealLoadingState } from './meal-loading/meal-loading.state';
import { mealLoadingReducer } from './meal-loading/meal-loading.reducer';
import {
  DeleteState,
  UpdateStatus,
} from '@reusable-parts/common-ngrx-patterns';
import { mealDeletingReducer } from './meal-deleting/meal-deleting.reducer';
import { CreateStatus } from '@reusable-parts/common-ngrx-patterns';
import { newMealReducer } from './new-meal/new-meal.reducer';
import { mealUpdatingReducer } from './meal-updating/meal-updating.reducer';
import { EntityState } from '@ngrx/entity';

/**
 * Interface to the part of the Store containing MealsState
 * and other information related to MealsData.
 */
export interface MealsFeatureState {
  readonly meals: MealState;
  readonly mealLoading: MealLoadingState;
  readonly mealDeleting: DeleteState;
  readonly mealUpdating: EntityState<UpdateStatus>;
  readonly newMeal: CreateStatus;
}

export const mealsFeatureReducer = {
  meals: mealsReducer,
  mealLoading: mealLoadingReducer,
  mealDeleting: mealDeletingReducer,
  mealUpdating: mealUpdatingReducer,
  newMeal: newMealReducer,
};
