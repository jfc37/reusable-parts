import { Action } from '@ngrx/store';

export enum MealLoadingActionTypes {
  GetAll = '[Meal Loading] Get All',

  LoadAll = '[Meal Loading] Load All',
  LoadAllSuccess = '[Meal Loading] Load All Success',
  LoadAllFailure = '[Meal Loading] Load All Failure',
}

export class GetAllMeals implements Action {
  readonly type = MealLoadingActionTypes.GetAll;
}

export class LoadAllMeals implements Action {
  readonly type = MealLoadingActionTypes.LoadAll;
}

export class LoadAllSuccessMeals implements Action {
  readonly type = MealLoadingActionTypes.LoadAllSuccess;
}

export class LoadAllFailureMeals implements Action {
  readonly type = MealLoadingActionTypes.LoadAllFailure;

  constructor(public error: string) { }
}

export type MealLoadingActions
  = GetAllMeals
  | LoadAllMeals
  | LoadAllSuccessMeals
  | LoadAllFailureMeals;
