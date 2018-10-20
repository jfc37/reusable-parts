import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { createPage, getNewKey } from '@reusable-parts/common-ngrx-patterns/src';
import { exhaustMap, filter, map, mergeMap, withLatestFrom, catchError } from 'rxjs/operators';
import {
  AttemptLoadStudentEnrolments,
  LoadStudentEnrolmentsRequest,
  LoadStudentEnrolmentsSuccess,
  LoadingStudentEnrolmentsActionTypes,
  LoadStudentEnrolmentsFailure,
} from './loading-student-enrolment.actions';
import { isLoadingEnrolmentSelector } from './loading-student-enrolment.selectors';
import { StudentEnrolmentFeatureState } from '../student-enrolment.reducer';
import { SetStudentEnrolments } from '../student-enrolment/student-enrolment.actions';
import { StudentEnrolmentRepository } from '../student-enrolment.repository';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoadingStudentEnrolmentsEffects {
  @Effect()
  attemptLoad$ = this.actions$
    .pipe(
      ofType<AttemptLoadStudentEnrolments>(LoadingStudentEnrolmentsActionTypes.Attempt),
      withLatestFrom(this.store.pipe(select(isLoadingEnrolmentSelector))),
      filter(([action, isAnyLoading]) => !isAnyLoading),
      map(([action]) => new LoadStudentEnrolmentsRequest(action.userId)),
    );

  @Effect()
  load$ = this.actions$
    .pipe(
      ofType<LoadStudentEnrolmentsRequest>(LoadingStudentEnrolmentsActionTypes.LoadRequest),
      exhaustMap(action =>
        this.repository
          .load(action.userId)
          .pipe(
            mergeMap(enrolmentIds => [
              new LoadStudentEnrolmentsSuccess(action.userId),
              new SetStudentEnrolments(action.userId, enrolmentIds),
            ]),
            catchError(error => of(new LoadStudentEnrolmentsFailure(action.userId, error || 'Error'))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private store: Store<StudentEnrolmentFeatureState>,
    private repository: StudentEnrolmentRepository,
  ) {}
}
