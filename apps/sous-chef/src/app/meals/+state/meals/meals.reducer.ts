import { MealsActionTypes, MealsActions } from './meals.actions';
import { MealState, getInitialMealState, mealAdapter } from './meals.state';

export function mealsReducer(
  state = getInitialMealState(),
  action: MealsActions
): MealState {
  switch (action.type) {
    case MealsActionTypes.Set:
      return mealAdapter.addAll(action.meals, state);

    case MealsActionTypes.SetCurrentSlug:
      return {
        ...state,
        currentSlug: action.slug,
      };

    default:
      return state;
  }
}
