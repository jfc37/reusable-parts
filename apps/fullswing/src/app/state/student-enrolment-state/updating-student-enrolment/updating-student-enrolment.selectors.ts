import { createSelector } from '@ngrx/store';
import {
  hasAnyUpdateErroredSelectorFn,
  isAnyUpdatingSelectorFn,
  allUpdatingIdsSelectorFn,
} from '@reusable-parts/common-ngrx-patterns/src';
import { studentEnrolmentFeatureSelector } from '../student-enrolment.reducer';
import { currentUserIdSelector } from '@reusable-parts/current-user-state/src/current-user/current-user.selectors';
import { flatten } from 'ramda';

const selector = createSelector(studentEnrolmentFeatureSelector, state => state.updatingStudentEnrolments);

export const isUpdatingEnrolmentSelector = isAnyUpdatingSelectorFn(selector);
export const hasEnrolmentUpdateErroredSelector = hasAnyUpdateErroredSelectorFn(selector);

export const currentUserEnrollingIds = createSelector(allUpdatingIdsSelectorFn(selector), ids =>
  flatten(ids.map(id => id.split('|').splice(1))),
);
