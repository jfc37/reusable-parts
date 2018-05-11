import {
  deleteAdapter,
  getDeletingStatus,
  DeleteStatus,
  getDeletedStatus,
  getDeleteErrorStatus,
} from '@reusable-parts/common-ngrx-patterns';
import {
  RemovingUserRolesActions,
  RemovingUserRolesActionTypes,
} from '@reusable-parts/user-state/src/user-roles/removing-user-roles/removing-user-roles.actions';
import { EntityState } from '@ngrx/entity';

export function removingUserRolesReducer(
  state = deleteAdapter.getInitialState(),
  action: RemovingUserRolesActions,
): EntityState<DeleteStatus> {
  switch (action.type) {
    case RemovingUserRolesActionTypes.Reset:
      return deleteAdapter.getInitialState();

    case RemovingUserRolesActionTypes.RemoveRequest:
      return deleteAdapter.addOne(getDeletingStatus(action.id), state);

    case RemovingUserRolesActionTypes.RemoveSuccess:
      return deleteAdapter.updateOne({ id: action.id, changes: getDeletedStatus(action.id) }, state);

    case RemovingUserRolesActionTypes.RemoveFailure:
      return deleteAdapter.updateOne(
        {
          id: action.id,
          changes: getDeleteErrorStatus(action.id, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
