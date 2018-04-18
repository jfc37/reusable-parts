import { Action } from '@ngrx/store';
import { Meal } from './meals.reducer';

export enum MealsActionTypes {
  Set = '[Meals] Set',
}

export class SetMeals implements Action {
  public meals: Meal[];
  readonly type = MealsActionTypes.Set;

  constructor(...meals: Meal[],) {
    this.meals = meals;
  }
}

export type MealsActions = SetMeals;
