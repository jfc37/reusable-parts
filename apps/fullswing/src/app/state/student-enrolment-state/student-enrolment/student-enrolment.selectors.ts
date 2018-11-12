import { createSelector } from '@ngrx/store';
import { isArrayEmpty } from '@reusable-parts/common-functions/src';
import { getISOWeek } from 'date-fns';
import { studentEnrolmentFeatureSelector } from '../student-enrolment.reducer';
import { currentUserIdSelector } from '@reusable-parts/current-user-state/src/current-user/current-user.selectors';
import { studentEnrolmentAdapter } from './student-enrolment.state';

const selector = createSelector(
  studentEnrolmentFeatureSelector,
  state => state.studentEnrolments,
);

export const studentEnrolmentEntitiesSelector = createSelector(
  selector,
  studentEnrolmentAdapter.getSelectors().selectEntities,
);

export const enrolmentsForCurrentUserSelector = createSelector(
  studentEnrolmentEntitiesSelector,
  currentUserIdSelector,
  (enrolmentDictionary, userId) => (enrolmentDictionary[userId] && enrolmentDictionary[userId].enrolmentIds) || [],
);
