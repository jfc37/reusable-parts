import { Action } from '@ngrx/store';
import { mealsReducer } from './meals/meals.reducer';
import { MealState } from './meals/meals.state';
import { MealLoadingState } from './meal-loading/meal-loading.state';
import { mealLoadingReducer } from './meal-loading/meal-loading.reducer';


/**
 * Interface to the part of the Store containing MealsState
 * and other information related to MealsData.
 */
export interface MealsFeatureState {
  readonly meals: MealState;
  readonly mealLoading: MealLoadingState;
}

export const mealsFeatureReducer = {
  meals: mealsReducer,
  mealLoading: mealLoadingReducer,
}
