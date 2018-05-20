import { EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { LoadStatus, getInitialLoadState } from '@reusable-parts/common-ngrx-patterns';
import { loadingStudentEnrolmentsReducer } from './loading-student-enrolment/loading-student-enrolment.reducer';

export interface StudentEnrolmentFeatureState {
  readonly loadingStudentEnrolments: EntityState<LoadStatus>;
}

export const studentEnrolmentFeatureReducer = {
  loadingStudentEnrolments: loadingStudentEnrolmentsReducer,
};

export function getInitialStudentEnrolmentFeatureState(): StudentEnrolmentFeatureState {
  return {
    loadingStudentEnrolments: getInitialLoadState(),
  };
}

export const studentEnrolmentFeatureSelector = createFeatureSelector<StudentEnrolmentFeatureState>(
  'studentEnrolmentFeature',
);
