import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
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
import { SetStudentEnrolments, AddStudentEnrolment } from '../student-enrolment/student-enrolment.actions';
import { StudentEnrolmentRepository } from '../student-enrolment.repository';
import { of } from 'rxjs/observable/of';
import { enrolmentsForCurrentUserSelector } from '../student-enrolment/student-enrolment.selectors';
import { StudentEnrolment } from '../student-enrolment';

@Injectable()
export class UpdatingStudentEnrolmentsEffects {
  @Effect()
  attemptReset$ = this.actions$
    .pipe(ofType<AttemptUpdateStudentEnrolments>(UpdatingStudentEnrolmentsActionTypes.Attempt), map(() => new ResetUpdateStudentEnrolments()));

  @Effect()
  attemptUpdate$ = this.actions$
    .pipe(ofType<AttemptUpdateStudentEnrolments>(UpdatingStudentEnrolmentsActionTypes.Attempt),
      withLatestFrom(this.store.pipe(select(isUpdatingEnrolmentSelector))),
      filter(([action, isAnyUpdating]) => !isAnyUpdating),
      map(([action]) => new UpdateStudentEnrolmentsRequest(action.userId, action.blockId)),
    );

  @Effect()
  update$ = this.actions$
    .pipe(ofType<UpdateStudentEnrolmentsRequest>(UpdatingStudentEnrolmentsActionTypes.UpdateRequest),
      exhaustMap(action =>
        this.repository
          .update(action.userId, action.blockId)
          .pipe(
            mergeMap(enrolmentIds => [
              new AddStudentEnrolment(action.userId, action.blockId),
              new UpdateStudentEnrolmentsSuccess(action.userId, action.blockId),
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
