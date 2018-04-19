import { getDefaultCreateStatus, CreateStatus, getCreatingStatus, getCreatedStatus, getCreateErrorStatus } from "@reusable-parts/common-ngrx-patterns/src/create-state/create.state";
import { NewMealActions, NewMealActionTypes } from "./new-meal.actions";

export function newMealReducer(
  state = getDefaultCreateStatus(),
  action: NewMealActions
): CreateStatus {
  switch (action.type) {
    case NewMealActionTypes.Reset:
      return getDefaultCreateStatus();

    case NewMealActionTypes.Create:
      return getCreatingStatus();

    case NewMealActionTypes.CreateSuccess:
      return getCreatedStatus();

    case NewMealActionTypes.CreateFailure:
      return getCreateErrorStatus(action.error);

    default:
      return state;
  }
}
