import { Action } from '@ngrx/store';
import { Meal } from './meals.state';

export enum MealsActionTypes {
  Set = '[Meals] Set',
  SetCurrentSlug = '[Meals] Set Current Slug',
}

export class SetMeals implements Action {
  public meals: Meal[];
  readonly type = MealsActionTypes.Set;

  constructor(...meals: Meal[]) {
    this.meals = meals;
  }
}

export class SetCurrentSlug implements Action {
  readonly type = MealsActionTypes.SetCurrentSlug;

  constructor(public slug: string) {}
}

export type MealsActions = SetMeals | SetCurrentSlug;
