import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { createPage, getNewKey } from '@reusable-parts/common-ngrx-patterns';
import { exhaustMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
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
  load$ = this.actions$.ofType<LoadStudentEnrolmentsRequest>(LoadingStudentEnrolmentsActionTypes.LoadRequest).pipe(
    mergeMap(action => [
      new LoadStudentEnrolmentsSuccess(action.userId),
      new SetStudentEnrolments({ userId: action.userId, enrolmentIds: ['tpRca1juZIwiFhWaj6rK'] }),
    ]),
    // exhaustMap(action =>
    //   this.repository
    //     .load(action.userId)
    //     .pipe(
    //       mergeMap(blocks => [
    //         new LoadStudentEnrolmentsSuccess(action.userId, ),
    //       ]),
    //     ),
    // ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<StudentEnrolmentFeatureState>, // private repository: BlockRepository,
  ) {}
}
