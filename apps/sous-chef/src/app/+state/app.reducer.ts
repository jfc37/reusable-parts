import { Action } from '@ngrx/store';
import { AppActions, AppActionTypes } from './app.actions';
import { AppState } from './app.state';

export const initialState: AppState = {
  mealItems: [],
};

export function appReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.SetMealItems:
      return { ...state, mealItems: action.mealItems };

    default:
      return state;
  }
}
