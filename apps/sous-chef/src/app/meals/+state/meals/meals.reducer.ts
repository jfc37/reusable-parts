import { MealsActionTypes, MealsActions } from './meals.actions';
import { MealState, mealAdapter } from './meals.state';

export function mealsReducer(
  state = mealAdapter.getInitialState(),
  action: MealsActions
): MealState {
  switch (action.type) {
    case MealsActionTypes.Set:
      return mealAdapter.addMany(action.meals, state);

    default:
      return state;
  }
}
