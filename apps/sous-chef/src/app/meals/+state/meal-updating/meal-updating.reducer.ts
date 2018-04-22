import {
  MealUpdatingActions,
  MealUpdatingActionTypes,
} from './meal-updating.actions';
import {
  updateAdapter,
  UpdateState,
  getUpdatedStatus,
  getUpdateErrorStatus,
  getUpdatingStatus,
} from '@reusable-parts/common-ngrx-patterns';

export function mealUpdatingReducer(
  state = updateAdapter.getInitialState(),
  action: MealUpdatingActions
): UpdateState {
  switch (action.type) {
    case MealUpdatingActionTypes.Update:
      return updateAdapter.addOne(getUpdatingStatus(action.id), state);

    case MealUpdatingActionTypes.UpdateSuccess:
      return updateAdapter.updateOne(
        { id: action.id, changes: getUpdatedStatus(action.id) },
        state
      );

    case MealUpdatingActionTypes.UpdateFailure:
      return updateAdapter.updateOne(
        {
          id: action.id,
          changes: getUpdateErrorStatus(action.id, action.error),
        },
        state
      );

    default:
      return state;
  }
}
