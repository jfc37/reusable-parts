import { Action } from '@ngrx/store';
import { Meal } from '../meals/meals.state';

export enum MealUpdatingActionTypes {
  Update = '[Meal Updating] Update',
  UpdateSuccess = '[Meal Updating] Update Success',
  UpdateFailure = '[Meal Updating] Update Failure',
}

export class UpdateMeal implements Action {
  readonly type = MealUpdatingActionTypes.Update;

  constructor(public id: string, public meal: Partial<Meal>) {}
}

export class UpdateMealSuccess implements Action {
  readonly type = MealUpdatingActionTypes.UpdateSuccess;

  constructor(public id: string) {}
}

export class UpdateMealFailure implements Action {
  readonly type = MealUpdatingActionTypes.UpdateFailure;

  constructor(public id: string, public error: string) { }
}

export type MealUpdatingActions
  = UpdateMeal
  | UpdateMealSuccess
  | UpdateMealFailure;
