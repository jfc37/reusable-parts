import { Update, EntityState } from '@ngrx/entity';
import { StudentEnrolmentsActionTypes, StudentEnrolmentsActions } from './student-enrolment.actions';
import { studentEnrolmentAdapter, getInitialStudentEnrolmentsState } from './student-enrolment.state';
import { StudentEnrolment } from '../student-enrolment';

export function studentEnrolmentsReducer(
  state = getInitialStudentEnrolmentsState(),
  action: StudentEnrolmentsActions,
): EntityState<StudentEnrolment> {
  switch (action.type) {
    case StudentEnrolmentsActionTypes.Set:
      return studentEnrolmentAdapter.upsertOne({ userId: action.userId, enrolmentIds: action.blockIds }, state);

    case StudentEnrolmentsActionTypes.Remove:
      return studentEnrolmentAdapter.removeOne(action.userId, state);

    default:
      return state;
  }
}
