import { Action } from '@ngrx/store';

export enum NewMealActionTypes {
  Reset = '[New Meal] Reset',

  Create = '[New Meal] Create',
  CreateSuccess = '[New Meal] Create Success',
  CreateFailure = '[New Meal] Create Failure',
}

export class ResetMeal implements Action {
  readonly type = NewMealActionTypes.Reset;

  constructor() {}
}

export class CreateMeal implements Action {
  readonly type = NewMealActionTypes.Create;

  constructor(public name: string) {}
}

export class CreateMealSuccess implements Action {
  readonly type = NewMealActionTypes.CreateSuccess;

  constructor() {}
}

export class CreateMealFailure implements Action {
  readonly type = NewMealActionTypes.CreateFailure;

  constructor(public error: string) {}
}

export type NewMealActions =
  | ResetMeal
  | CreateMeal
  | CreateMealSuccess
  | CreateMealFailure;
