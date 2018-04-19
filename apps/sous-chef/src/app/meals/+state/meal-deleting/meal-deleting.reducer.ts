import { deleteAdapter, DeleteState, getDeletingStatus, getDeleteErrorStatus, getDeletedStatus } from "@reusable-parts/common-ngrx-patterns/src/delete-state/delete.state";
import { MealDeletingActions, MealDeletingActionTypes } from "./meal-deleting.actions";

export function mealDeletingReducer(
  state = deleteAdapter.getInitialState(),
  action: MealDeletingActions
): DeleteState {
  switch (action.type) {
    case MealDeletingActionTypes.Delete:
      return deleteAdapter.addOne(getDeletingStatus(action.id), state);

    case MealDeletingActionTypes.DeleteSuccess:
      return deleteAdapter.updateOne({id: action.id, changes: getDeletedStatus(action.id)}, state);

    case MealDeletingActionTypes.DeleteFailure:
      return deleteAdapter.updateOne({id: action.id, changes: getDeleteErrorStatus(action.id, action.error)}, state);

    default:
      return state;
  }
}
