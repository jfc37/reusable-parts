import { createSelector } from '@ngrx/store';
import { isAnyLoadingSelectorFn, hasAnyLoadErroredSelectorFn } from '@reusable-parts/common-ngrx-patterns';
import { studentEnrolmentFeatureSelector } from '../student-enrolment.reducer';

const selector = createSelector(studentEnrolmentFeatureSelector, state => state.loadingStudentEnrolments);

export const isLoadingEnrolmentSelector = isAnyLoadingSelectorFn(selector);
export const hasEnrolmentLoadErroredSelector = hasAnyLoadErroredSelectorFn(selector);
