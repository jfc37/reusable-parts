import { Action } from '@ngrx/store';
import { NavItem } from './app.state';

export enum AppActionTypes {
  Initialise = '[App] Initialise',
  SetMealItems = '[App] Set Meal Items',
}

export class Initialise implements Action {
  readonly type = AppActionTypes.Initialise;
}

export class SetMealItems implements Action {
  readonly type = AppActionTypes.SetMealItems;

  constructor(public mealItems: NavItem[]) {}
}

export type AppActions = Initialise | SetMealItems;
