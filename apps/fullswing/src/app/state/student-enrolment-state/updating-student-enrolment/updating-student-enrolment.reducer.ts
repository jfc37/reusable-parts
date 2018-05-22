import { EntityState } from '@ngrx/entity';
import {
  UpdateStatus,
  getUpdateErrorStatus,
  getUpdatedStatus,
  getUpdatingStatus,
  updateAdapter,
  pageKeyToId,
} from '@reusable-parts/common-ngrx-patterns';
import {
  UpdatingStudentEnrolmentsActions,
  UpdatingStudentEnrolmentsActionTypes,
} from './updating-student-enrolment.actions';
import { studentEnrolmentToId } from '../student-enrolment';

export function updatingStudentEnrolmentsReducer(
  state = updateAdapter.getInitialState(),
  action: UpdatingStudentEnrolmentsActions,
): EntityState<UpdateStatus> {
  switch (action.type) {
    case UpdatingStudentEnrolmentsActionTypes.Reset:
      return updateAdapter.getInitialState();

    case UpdatingStudentEnrolmentsActionTypes.UpdateRequest:
      return updateAdapter.addOne(getUpdatingStatus(studentEnrolmentToId(action.enrolment)), state);

    case UpdatingStudentEnrolmentsActionTypes.UpdateSuccess:
      const removed = updateAdapter.removeOne(studentEnrolmentToId(action.enrolment), state);
      return updateAdapter.addOne(getUpdatedStatus(studentEnrolmentToId(action.enrolment)), removed);

    case UpdatingStudentEnrolmentsActionTypes.UpdateFailure:
      const id = studentEnrolmentToId(action.enrolment);
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
