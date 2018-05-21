import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createPage, getNewKey } from '@reusable-parts/common-ngrx-patterns';
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
    .ofType<AttemptLoadStudentEnrolments>(LoadingStudentEnrolmentsActionTypes.Attempt)
    .pipe(
      withLatestFrom(this.store.select(isLoadingEnrolmentSelector)),
      filter(([action, isAnyLoading]) => !isAnyLoading),
      map(([action]) => new LoadStudentEnrolmentsRequest(action.userId)),
    );

  @Effect()
  load$ = this.actions$
    .ofType<LoadStudentEnrolmentsRequest>(LoadingStudentEnrolmentsActionTypes.LoadRequest)
    .pipe(
      exhaustMap(action =>
        this.repository
          .load(action.userId)
          .pipe(
            mergeMap(enrolmentIds => [
              new LoadStudentEnrolmentsSuccess(action.userId),
              new SetStudentEnrolments({ userId: action.userId, enrolmentIds }),
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
