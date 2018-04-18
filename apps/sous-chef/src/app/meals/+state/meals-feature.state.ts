import { Action } from '@ngrx/store';
import { MealState, mealsReducer } from './meals/meals.reducer';


/**
 * Interface to the part of the Store containing MealsState
 * and other information related to MealsData.
 */
export interface MealsFeatureState {
  readonly meals: MealState;
}

export const mealsFeatureReducer = {
  meals: mealsReducer,
}
