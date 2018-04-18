import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { MealsActions, MealsActionTypes } from './meals.actions';
import { Meal, MealState } from './meals.state';


const mealAdapter = createEntityAdapter<Meal>({
  selectId: meal => meal.id,
});

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
