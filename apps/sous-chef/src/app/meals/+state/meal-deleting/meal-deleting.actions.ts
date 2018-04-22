import { Action } from '@ngrx/store';

export enum MealDeletingActionTypes {
  Delete = '[Meal Deleting] Delete',
  DeleteSuccess = '[Meal Deleting] Delete Success',
  DeleteFailure = '[Meal Deleting] Delete Failure',
}

export class DeleteMeal implements Action {
  readonly type = MealDeletingActionTypes.Delete;

  constructor(public id: string) {}
}

export class DeleteMealSuccess implements Action {
  readonly type = MealDeletingActionTypes.DeleteSuccess;

  constructor(public id: string) {}
}

export class DeleteMealFailure implements Action {
  readonly type = MealDeletingActionTypes.DeleteFailure;

  constructor(public id: string, public error: string) {}
}

export type MealDeletingActions =
  | DeleteMeal
  | DeleteMealSuccess
  | DeleteMealFailure;
