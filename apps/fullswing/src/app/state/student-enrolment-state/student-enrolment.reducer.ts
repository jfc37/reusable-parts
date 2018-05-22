import { EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import {
  LoadStatus,
  getInitialLoadState,
  UpdateStatus,
  getInitialUpdateState,
} from '@reusable-parts/common-ngrx-patterns';
import { loadingStudentEnrolmentsReducer } from './loading-student-enrolment/loading-student-enrolment.reducer';
import { StudentEnrolment } from './student-enrolment';
import { studentEnrolmentsReducer } from './student-enrolment/student-enrolment.reducer';
import { getInitialStudentEnrolmentsState } from './student-enrolment/student-enrolment.state';
import { updatingStudentEnrolmentsReducer } from './updating-student-enrolment/updating-student-enrolment.reducer';

export interface StudentEnrolmentFeatureState {
  readonly loadingStudentEnrolments: EntityState<LoadStatus>;
  readonly updatingStudentEnrolments: EntityState<UpdateStatus>;
  readonly studentEnrolments: EntityState<StudentEnrolment>;
}

export const studentEnrolmentFeatureReducer = {
  loadingStudentEnrolments: loadingStudentEnrolmentsReducer,
  updatingStudentEnrolments: updatingStudentEnrolmentsReducer,
  studentEnrolments: studentEnrolmentsReducer,
};

export function getInitialStudentEnrolmentFeatureState(): StudentEnrolmentFeatureState {
  return {
    loadingStudentEnrolments: getInitialLoadState(),
    updatingStudentEnrolments: getInitialUpdateState(),
    studentEnrolments: getInitialStudentEnrolmentsState(),
  };
}

export const studentEnrolmentFeatureSelector = createFeatureSelector<StudentEnrolmentFeatureState>(
  'studentEnrolmentFeature',
);
