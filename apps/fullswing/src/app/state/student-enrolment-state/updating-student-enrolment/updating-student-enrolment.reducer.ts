import { EntityState } from '@ngrx/entity';
import {
  UpdateStatus,
  getUpdateErrorStatus,
  getUpdatedStatus,
  getUpdatingStatus,
  updateAdapter,
  pageKeyToId,
} from '@reusable-parts/common-ngrx-patterns/src';
import {
  UpdatingStudentEnrolmentsActions,
  UpdatingStudentEnrolmentsActionTypes,
} from './updating-student-enrolment.actions';

export function updatingStudentEnrolmentsReducer(
  state = updateAdapter.getInitialState(),
  action: UpdatingStudentEnrolmentsActions,
): EntityState<UpdateStatus> {
  switch (action.type) {
    case UpdatingStudentEnrolmentsActionTypes.Reset:
      return updateAdapter.getInitialState();

    case UpdatingStudentEnrolmentsActionTypes.UpdateRequest:
      return updateAdapter.addOne(getUpdatingStatus([action.userId, action.blockId].join('|')), state);

    case UpdatingStudentEnrolmentsActionTypes.UpdateSuccess:
      const removed = updateAdapter.removeOne([action.userId, action.blockId].join('|'), state);
      return updateAdapter.addOne(getUpdatedStatus([action.userId, action.blockId].join('|')), removed);

    case UpdatingStudentEnrolmentsActionTypes.UpdateFailure:
      const id = [action.userId, action.blockId].join('|');
      return updateAdapter.updateOne(
        {
          id,
          changes: getUpdateErrorStatus(id, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
