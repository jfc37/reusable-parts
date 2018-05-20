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
} from './loading-student-enrolment.actions';
import { isLoadingEnrolmentSelector } from './loading-student-enrolment.selectors';
import { StudentEnrolmentFeatureState } from '../student-enrolment.reducer';

@Injectable()
export class LoadingStudentEnrolmentsEffects {
  @Effect()
  attemptLoad$ = this.actions$
    .ofType<AttemptLoadStudentEnrolments>(LoadingStudentEnrolmentsActionTypes.Attempt)
    .pipe(
      withLatestFrom(this.store.select(isLoadingEnrolmentSelector)),
      filter(([action, isAnyLoading]) => !isAnyLoading),
      map(([action]) => new LoadStudentEnrolmentsRequest()),
    );

  // @Effect()
  // load$ = this.actions$
  //   .ofType<LoadStudentEnrolmentsRequest>(LoadingStudentEnrolmentsActionTypes.LoadRequest)
  //   .pipe(
  //     exhaustMap(action =>
  //       this.repository
  //         .load(action.userId)
  //         .pipe(
  //           mergeMap(blocks => [
  //             new LoadStudentEnrolmentsSuccess(action.userId, ),
  //           ]),
  //         ),
  //     ),
  //   );

  constructor(
    private actions$: Actions,
    private store: Store<StudentEnrolmentFeatureState>, // private repository: BlockRepository,
  ) {}
}
