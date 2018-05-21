import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { StudentEnrolment } from '../student-enrolment';

export const studentEnrolmentAdapter = createEntityAdapter<StudentEnrolment>({
  selectId: studentEnrolment => studentEnrolment.userId,
});

export function getInitialStudentEnrolmentsState(): EntityState<StudentEnrolment> {
  return {
    ...studentEnrolmentAdapter.getInitialState(),
  };
}
