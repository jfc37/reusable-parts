import { MealLoadingState } from "./meal-loading.state";
import { MealLoadingActions, MealLoadingActionTypes } from "./meal-loading.actions";

function getInitialState(): MealLoadingState {
  return {
    loadedAll: false,
    loadingAll: false,
    error: null,
  }
}

export function mealLoadingReducer(
  state = getInitialState(),
  action: MealLoadingActions
): MealLoadingState {
  switch (action.type) {
    case MealLoadingActionTypes.LoadAll:
      return {
        loadedAll: false,
        loadingAll: true,
        error: null,
      };

    case MealLoadingActionTypes.LoadAllSuccess:
      return {
        loadedAll: true,
        loadingAll: false,
        error: null,
      };

    case MealLoadingActionTypes.LoadAllFailure:
      return {
        loadedAll: false,
        loadingAll: false,
        error: action.error,
      };

    default:
      return state;
  }
}
