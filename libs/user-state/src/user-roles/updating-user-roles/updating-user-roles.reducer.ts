import {
  updateAdapter,
  UpdateStatus,
  getUpdatingStatus,
  getUpdatedStatus,
  getUpdateErrorStatus,
} from '@reusable-parts/common-ngrx-patterns';
import {
  UpdatingUserRolesActions,
  UpdatingUserRolesActionTypes,
} from '@reusable-parts/user-state/src/user-roles/updating-user-roles/updating-user-roles.actions';
import { EntityState } from '@ngrx/entity';

export function updatingUserRolesReducer(
  state = updateAdapter.getInitialState(),
  action: UpdatingUserRolesActions,
): EntityState<UpdateStatus> {
  switch (action.type) {
    case UpdatingUserRolesActionTypes.Reset:
      return updateAdapter.getInitialState();

    case UpdatingUserRolesActionTypes.UpdateRequest:
      return updateAdapter.addOne(getUpdatingStatus(action.id), state);

    case UpdatingUserRolesActionTypes.UpdateSuccess:
      return updateAdapter.updateOne({ id: action.id, changes: getUpdatedStatus(action.id) }, state);

    case UpdatingUserRolesActionTypes.UpdateFailure:
      return updateAdapter.updateOne(
        {
          id: action.id,
          changes: getUpdateErrorStatus(action.id, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
