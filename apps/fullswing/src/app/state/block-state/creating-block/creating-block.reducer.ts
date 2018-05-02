import {
  CreatingBlockActionTypes,
  CreatingBlockActions,
} from './creating-block.actions';
import {
  getDefaultCreateStatus,
  CreateStatus,
  getCreatingStatus,
  getCreatedStatus,
  getCreateErrorStatus,
} from '@reusable-parts/common-ngrx-patterns';

export function creatingBlockReducer(
  state = getDefaultCreateStatus(),
  action: CreatingBlockActions
): CreateStatus {
  switch (action.type) {
    case CreatingBlockActionTypes.Reset:
      return getDefaultCreateStatus();

    case CreatingBlockActionTypes.CreateRequest:
      return getCreatingStatus();

    case CreatingBlockActionTypes.CreateSuccess:
      return getCreatedStatus();

    case CreatingBlockActionTypes.CreateFailure:
      return getCreateErrorStatus(action.error);

    default:
      return state;
  }
}
