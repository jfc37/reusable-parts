import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createPage, getNewKey } from '@reusable-parts/common-ngrx-patterns/src';
import { exhaustMap, filter, map, mergeMap, withLatestFrom, catchError } from 'rxjs/operators';
import {
  AttemptUpdateStudentEnrolments,
  UpdateStudentEnrolmentsRequest,
  UpdateStudentEnrolmentsSuccess,
  UpdatingStudentEnrolmentsActionTypes,
  UpdateStudentEnrolmentsFailure,
  ResetUpdateStudentEnrolments,
} from './updating-student-enrolment.actions';
import { isUpdatingEnrolmentSelector } from './updating-student-enrolment.selectors';
import { StudentEnrolmentFeatureState } from '../student-enrolment.reducer';
import { SetStudentEnrolments } from '../student-enrolment/student-enrolment.actions';
import { StudentEnrolmentRepository } from '../student-enrolment.repository';
import { of } from 'rxjs/observable/of';
import { enrolmentsForCurrentUserSelector } from '../student-enrolment/student-enrolment.selectors';
import { StudentEnrolment } from '../student-enrolment';

@Injectable()
export class UpdatingStudentEnrolmentsEffects {
  @Effect()
  attemptReset$ = this.actions$
    .ofType<AttemptUpdateStudentEnrolments>(UpdatingStudentEnrolmentsActionTypes.Attempt)
    .pipe(map(() => new ResetUpdateStudentEnrolments()));

  @Effect()
  attemptUpdate$ = this.actions$
    .ofType<AttemptUpdateStudentEnrolments>(UpdatingStudentEnrolmentsActionTypes.Attempt)
    .pipe(
      withLatestFrom(this.store.select(isUpdatingEnrolmentSelector)),
      filter(([action, isAnyUpdating]) => !isAnyUpdating),
      map(([action]) => new UpdateStudentEnrolmentsRequest(action.userId, action.blockId)),
    );

  @Effect()
  update$ = this.actions$
    .ofType<UpdateStudentEnrolmentsRequest>(UpdatingStudentEnrolmentsActionTypes.UpdateRequest)
    .pipe(
      withLatestFrom(this.store.select(enrolmentsForCurrentUserSelector)),
      exhaustMap(([action, enrolledIds]) =>
        this.repository
          .update(action.userId, [action.blockId, ...enrolledIds])
          .pipe(
            mergeMap(enrolmentIds => [
              new UpdateStudentEnrolmentsSuccess(action.userId, action.blockId),
              new SetStudentEnrolments(action.userId, [action.blockId, ...enrolledIds]),
            ]),
            catchError(error =>
              of(new UpdateStudentEnrolmentsFailure(action.userId, action.blockId, error || 'Error')),
            ),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<StudentEnrolmentFeatureState>,
    private repository: StudentEnrolmentRepository,
  ) {}
}
