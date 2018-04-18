import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { MealsActions, MealsActionTypes } from './meals.actions';

export interface Meal {
  id: string;
  name: string;
}

const mealAdapter = createEntityAdapter<Meal>({
  selectId: meal => meal.id,
});
export interface MealState extends EntityState<Meal> {}

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
